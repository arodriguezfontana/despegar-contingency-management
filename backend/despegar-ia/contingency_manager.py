import os
from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
app = FastAPI()


class ContingencyData(BaseModel):
    reservaId: int
    usuarioId: int
    nombreUsuario: str
    perfilUsuario: str
    vueloId: Optional[int] = None
    origen: Optional[str] = None
    destino: Optional[str] = None
    estadoVuelo: Optional[str] = None
    fechaHoraVuelo: Optional[str] = None
    hotelId: Optional[int] = None
    nombreHotel: Optional[str] = None
    localidadHotel: Optional[str] = None
    estadoHotel: Optional[str] = None
    estadoGeneralReserva: str


@app.post("/procesar-contingencia")
def procesar(data: ContingencyData):
    try:
        # Configuración refinada: Sin usar "Se debe", más sutil y sugerente
        config_perfiles = {
            "VIP": {
                "mood": "Exclusividad y Lujo",
                "idea": "Sabiendo que buscas disfrutar de cada detalle con la máxima excelencia",
                "detalles": "vistas a lugares con renombre, experiencias exclusivas o servicios premium."
            },
            "BUSINESS": {
                "mood": "Eficiencia y Trabajo",
                "idea": "Para que puedas optimizar tu tiempo y mantener la productividad en tu viaje",
                "detalles": "WiFi de alta velocidad, espacios tranquilos, cafés 24hs o zonas de coworking."
            },
            "FAMILIA": {
                "mood": "Protector y Familiar",
                "idea": "Pensando en la comodidad de todos y en crear momentos especiales para los tuyos",
                "detalles": "áreas de juegos, lugares espaciosos, actividades para todas las edades y seguridad."
            },
            "LOW_COST": {
                "mood": "Inteligente y Económico",
                "idea": "Para que aproveches al máximo la ciudad de forma inteligente",
                "detalles": "actividades gratuitas, lugares con entrada libre y la mejor gastronomía local o street food."
            },
            "ESTANDAR": {
                "mood": "Explorador y Clásico",
                "idea": "Para que no te pierdas nada de la esencia y los puntos más icónicos",
                "detalles": "actividades clásicas, lugares populares y puntos turísticos recomendados."
            }
        }

        perfil_actual = config_perfiles.get(data.perfilUsuario.upper(), config_perfiles["ESTANDAR"])
        es_contingencia = data.estadoGeneralReserva == "CON_CONTINGENCIA"

        tipo_problema = "TODO_OK"
        if es_contingencia:
            if data.estadoVuelo == "CANCELADO":
                tipo_problema = "VUELO_CANCELADO"
            elif data.estadoVuelo == "DEMORADO":
                tipo_problema = "VUELO_DEMORADO"
            elif data.estadoHotel == "NO_DISPONIBLE":
                tipo_problema = "HOTEL_NO_DISPONIBLE"

        prompt_system = f"""Eres el Experto en el manejo de contingencias post venta de Despegar. Tu prioridad es la TRANQUILIDAD y el TIEMPO de {data.nombreUsuario}.
        Tu tono debe ser empático y profesional: Despegar ya trabajó para solucionar todo antes de que el usuario lo note.

        REGLAS CRÍTICAS:
        - NUNCA uses códigos IATA del aeropuerto, usa el nombre de la CIUDAD.
        - Si el estado es ACTIVO: PROHIBIDO usar palabras como 'lamentamos', 'error' o 'problema'. Sé un anfitrión entusiasta.
        - Los beneficios NO son premios, son 'compensaciones por cortesía de Despegar' ya impactadas en su cuenta.
        - Segmentación: El usuario tiene un mood de {perfil_actual['mood']}. Las sugerencias deben ser sutiles, como si conocieras sus gustos sin ser evidente.
        """

        prompt_user = f"""
        SITUACIÓN: {tipo_problema}
        CONTEXTO: Origen {data.origen} | Destino {data.destino} | Hotel {data.nombreHotel}.

        INSTRUCCIONES DE RESPUESTA:
        A) SI ES VUELO_CANCELADO: Informa la reubicación inmediata en proximo vuelo. Presenta el beneficio como una compensación de Despegar por las molestias.
        B) SI ES VUELO_DEMORADO: Disculpas por la espera en {data.origen}. Presenta el beneficio (Sala VIP, vouchers) como una cortesía para hacer su espera amena.
        C) SI ES HOTEL_NO_DISPONIBLE: Informa la reubicación en la ciudad {data.destino}. Presenta el upgrade o crédito como una compensación por el cambio de planes.
        D) SI ES TODO_OK: Saludo cálido confirmando que el itinerario a {data.destino} está perfecto.

        INSTRUCCIONES DE SUGERENCIAS (MÁXIMO 1 POR LISTA):
        - No uses frases imperativas (no digas "debes" o "haz"). Usa tono de recomendación: "podrías conocer", "te sugerimos", "una gran opción sería".
        - La sugerencia DEBE empezar integrando sutilmente esta idea: "{perfil_actual['idea']}".
        - Adapta la sugerencia al entorno de la ciudad (si es playa, nieve, metrópolis, etc.).
        - Ante dudas, indica que se comuniquen con soporte.

        RESPONDE ÚNICAMENTE EN ESTE FORMATO JSON:
        {{
            "contingencia": "Resumen técnico",
            "mensaje": "Mensaje empático/alegre según situación",
            "beneficio": "Detalle de la compensación de cortesía (ya impactada)",
            "sugerencias_origen": ["..."],
            "sugerencias_destino": ["..."]
        }}
        """

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": prompt_system},
                {"role": "user", "content": prompt_user}
            ],
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"}
        )

        return json.loads(chat_completion.choices[0].message.content)

    except Exception as e:
        return {
            "contingencia": "Error",
            "mensaje": "Estamos trabajando para reconectar tu asistencia.",
            "beneficio": "Soporte técnico notificado.",
            "sugerencias_origen": [], "sugerencias_destino": []
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)