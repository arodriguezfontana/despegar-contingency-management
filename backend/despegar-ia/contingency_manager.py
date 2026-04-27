import os
from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import json
from dotenv import load_dotenv
import requests

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
URL_BASE_JAVA = os.getenv("JAVA_BACKEND_URL")

client = Groq(api_key=API_KEY)
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
        contexto = []
        if data.vueloId and data.estadoVuelo in ['CANCELADO', 'DEMORADO']:
            resp = requests.get(f"{URL_BASE_JAVA}/vuelos")
            contexto = resp.json() if resp.status_code == 200 else []
        elif data.hotelId and data.estadoHotel == 'NO_DISPONIBLE':
            resp = requests.get(f"{URL_BASE_JAVA}/hoteles")
            contexto = resp.json() if resp.status_code == 200 else []

        prompt_system = f"""Eres el Asistente Inteligente de Despegar. 
        Tu objetivo es resolver crisis de viaje con criterio humano.
        Perfil del cliente: {data.perfilUsuario}."""

        prompt_user = f"""
        DATOS DE LA RESERVA:
        - Vuelo: {data.origen} -> {data.destino} (Estado: {data.estadoVuelo if data.vueloId else 'N/A'})
        - Hotel: {data.nombreHotel} (Estado: {data.estadoHotel if data.hotelId else 'N/A'})
        - Ubicación actual: {data.origen if data.vueloId else data.localidadHotel}
        - Alternativas en BD: {contexto}

        REGLAS DE NEGOCIO:
        1. SI HAY DEMORA DE VUELO: Ofrece 15% OFF en locales de {data.origen} o Sala VIP si es perfil BUSINESS/LUJO.
        2. SI HAY CANCELACIÓN DE VUELO: Busca en las alternativas un vuelo de {data.origen} a {data.destino} y asígnalo. Suma 25% OFF para su próxima compra.
        3. SI HOTEL NO DISPONIBLE: Busca en las alternativas el hotel más cercano en {data.localidadHotel} con estrellas >= al original.
        4. SI TODO ESTÁ BIEN: 
           - Vuelo OK: Saludo alegre + 3 lugares/actividades en aeropuerto {data.origen}.
           - Hotel OK: Recomienda 3 lugares/actividades cerca de {data.nombreHotel} en {data.localidadHotel}.

        RESPONDE ÚNICAMENTE EN ESTE FORMATO JSON:
        {{
            "contingencia": "Descripción del problema o 'Sin inconvenientes'",
            "mensaje": "Mensaje empático personalizado",
            "beneficio": "Detalle del descuento, sala VIP o nuevo hotel/vuelo",
            "actividades": ["Actividad 1", "Actividad 2", "Actividad 3"]
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
            "contingencia": "Error técnico",
            "mensaje": "Estamos teniendo problemas para conectar con el servidor.",
            "beneficio": "Contacte a soporte.",
            "actividades": []
        }

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)