from fastapi import APIRouter
from typing import Dict, Any
from services.mock_data import (
    generate_mock_crop_map,
    generate_mock_moisture_stress,
    generate_mock_irrigation_advisory,
    generate_time_series_data,
    generate_validation_metrics,
    generate_phenology_data,
    generate_water_balance_data,
    generate_spectral_indices
)

router = APIRouter()

@router.get("/crop-map")
async def get_crop_map(region: str = "pilot_area", date: str = None) -> Dict[str, Any]:
    return generate_mock_crop_map(region, date)

@router.get("/moisture-stress")
async def get_moisture_stress(region: str = "pilot_area", stage: str = "flowering", date: str = None) -> Dict[str, Any]:
    return generate_mock_moisture_stress(region, stage, date)

@router.get("/irrigation-advisory")
async def get_irrigation_advisory(region: str = "pilot_area", date: str = None) -> Dict[str, Any]:
    return generate_mock_irrigation_advisory(region, date)

@router.get("/time-series")
async def get_time_series(region: str = "pilot_area") -> Dict[str, Any]:
    return generate_time_series_data(region)

@router.get("/validation-metrics")
async def get_validation_metrics() -> Dict[str, Any]:
    return generate_validation_metrics()

@router.get("/phenology")
async def get_phenology() -> Dict[str, Any]:
    return generate_phenology_data()

@router.get("/water-balance")
async def get_water_balance() -> Dict[str, Any]:
    return generate_water_balance_data()

@router.get("/spectral-indices")
async def get_spectral_indices(index_name: str = "ndvi", date: str = None) -> Dict[str, Any]:
    return generate_spectral_indices(index_name, date)
