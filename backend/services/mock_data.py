import random
import datetime
import math

# Base coordinates near Karnal, Haryana (example pilot area)
BASE_LAT = 29.6857
BASE_LON = 76.9905

CROP_TYPES = ["Wheat", "Rice", "Sugarcane", "Mustard", "Cotton"]
STRESS_LEVELS = ["No Stress", "Low", "Moderate", "High", "Severe"]
GROWTH_STAGES = ["Sowing", "Germination", "Tillering", "Flowering", "Grain Filling", "Maturity", "Harvest"]
ADVISORY_STATUS = ["No Action", "Monitor", "Irrigate within 3 days", "Immediate Irrigation Required"]

def generate_grid_features(base_lat, base_lon, rows, cols, prop_generator):
    """Helper to generate a grid of GeoJSON polygons."""
    features = []
    step = 0.005  # rough degree step for grid cells (approx 500m)

    for i in range(rows):
        for j in range(cols):
            lat = base_lat + (i * step)
            lon = base_lon + (j * step)

            polygon = [
                [lon, lat],
                [lon + step, lat],
                [lon + step, lat + step],
                [lon, lat + step],
                [lon, lat]
            ]

            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [polygon]
                },
                "properties": prop_generator(i, j)
            }
            features.append(feature)

    return {
        "type": "FeatureCollection",
        "features": features
    }


# ─────────────────────────────────────────────────
# 1. CROP MAP
# ─────────────────────────────────────────────────
def generate_mock_crop_map(region: str, date: str = None):
    # Use date to seed random for dynamic behavior
    seed_val = 42 if not date else 42 + hash(date) % 1000
    random.seed(seed_val)
    def props(i, j):
        crop = random.choice(CROP_TYPES)
        return {
            "crop_type": crop,
            "confidence": round(random.uniform(0.78, 0.98), 2),
            "ndvi": round(random.uniform(0.35, 0.85), 3),
            "evi": round(random.uniform(0.20, 0.70), 3),
            "growth_stage": random.choice(GROWTH_STAGES),
        }
    return generate_grid_features(BASE_LAT, BASE_LON, 8, 8, props)


# ─────────────────────────────────────────────────
# 2. MOISTURE STRESS
# ─────────────────────────────────────────────────
def generate_mock_moisture_stress(region: str, stage: str, date: str = None):
    seed_val = 43 if not date else 43 + hash(date) % 1000
    random.seed(seed_val)
    def props(i, j):
        stress = random.choice(STRESS_LEVELS)
        return {
            "stress_level": stress,
            "stage": stage,
            "smi": round(random.uniform(0.1, 0.9), 2),
            "vci": round(random.uniform(10, 95), 1),
            "ndwi": round(random.uniform(-0.3, 0.5), 3),
            "backscatter_vv": round(random.uniform(-18, -6), 2),
            "backscatter_vh": round(random.uniform(-25, -12), 2),
        }
    return generate_grid_features(BASE_LAT, BASE_LON, 8, 8, props)


# ─────────────────────────────────────────────────
# 3. IRRIGATION ADVISORY
# ─────────────────────────────────────────────────
def generate_mock_irrigation_advisory(region: str, date: str = None):
    seed_val = 44 if not date else 44 + hash(date) % 1000
    random.seed(seed_val)
    def props(i, j):
        advisory = random.choice(ADVISORY_STATUS)
        deficit = round(random.uniform(0, 55), 1) if advisory != "No Action" else 0.0
        etc = round(random.uniform(3.5, 7.2), 2)
        rainfall = round(random.uniform(0, 4.5), 2)
        actual_et = round(random.uniform(1.5, 5.0), 2)
        return {
            "advisory": advisory,
            "water_deficit_mm": deficit,
            "etc_mm_day": etc,
            "rainfall_mm": rainfall,
            "actual_et_mm": actual_et,
            "kc": round(random.uniform(0.4, 1.2), 2),
            "irrigation_depth_mm": round(deficit * 0.8, 1) if deficit > 0 else 0,
        }
    return generate_grid_features(BASE_LAT, BASE_LON, 8, 8, props)


# ─────────────────────────────────────────────────
# 4. TIME SERIES
# ─────────────────────────────────────────────────
def generate_time_series_data(region: str):
    data = []
    today = datetime.date.today()
    for i in range(16, 0, -1):
        date = today - datetime.timedelta(days=i * 8)  # 8-day composites
        # Simulate a realistic seasonal curve
        phase = (16 - i) / 16  # 0 to 1
        ndvi_base = 0.25 + 0.55 * math.sin(phase * math.pi)
        data.append({
            "date": date.strftime("%Y-%m-%d"),
            "ndvi": round(ndvi_base + random.uniform(-0.05, 0.05), 3),
            "evi": round((ndvi_base * 0.75) + random.uniform(-0.03, 0.03), 3),
            "ndwi": round((ndvi_base * 0.4 - 0.1) + random.uniform(-0.04, 0.04), 3),
            "soil_moisture": round(25 + 15 * math.sin(phase * math.pi) + random.uniform(-3, 3), 1),
            "vv_backscatter": round(-12 + 4 * math.sin(phase * math.pi) + random.uniform(-1, 1), 2),
            "vh_backscatter": round(-18 + 3 * math.sin(phase * math.pi) + random.uniform(-1, 1), 2),
            "rainfall_mm": round(max(0, random.gauss(8, 12)), 1),
            "et0_mm": round(random.uniform(3.0, 6.5), 2),
        })
    return {"time_series": data}


# ─────────────────────────────────────────────────
# 5. VALIDATION METRICS
# ─────────────────────────────────────────────────
def generate_validation_metrics():
    n_classes = len(CROP_TYPES)
    # Generate a realistic confusion matrix
    # Diagonal-dominant (high accuracy)
    matrix = []
    total_correct = 0
    total_samples = 0
    for i in range(n_classes):
        row = []
        for j in range(n_classes):
            if i == j:
                val = random.randint(85, 120)  # true positives
                total_correct += val
            else:
                val = random.randint(1, 12)  # misclassifications
            row.append(val)
            total_samples += val
        matrix.append(row)

    overall_accuracy = round(total_correct / total_samples * 100, 1)

    # Per-class metrics
    per_class = []
    for idx, crop in enumerate(CROP_TYPES):
        tp = matrix[idx][idx]
        fp = sum(matrix[r][idx] for r in range(n_classes)) - tp
        fn = sum(matrix[idx]) - tp
        precision = round(tp / (tp + fp) * 100, 1) if (tp + fp) > 0 else 0
        recall = round(tp / (tp + fn) * 100, 1) if (tp + fn) > 0 else 0
        f1 = round(2 * precision * recall / (precision + recall), 1) if (precision + recall) > 0 else 0
        per_class.append({
            "crop": crop,
            "precision": precision,
            "recall": recall,
            "f1_score": f1,
            "support": sum(matrix[idx])
        })

    # Kappa coefficient (simplified)
    pe = sum(
        (sum(matrix[i]) * sum(matrix[r][i] for r in range(n_classes)))
        for i in range(n_classes)
    ) / (total_samples ** 2)
    kappa = round((overall_accuracy / 100 - pe) / (1 - pe), 3) if pe < 1 else 0

    return {
        "confusion_matrix": matrix,
        "class_labels": CROP_TYPES,
        "overall_accuracy": overall_accuracy,
        "kappa_coefficient": kappa,
        "per_class_metrics": per_class,
        "total_samples": total_samples,
        "model_used": "Random Forest + LSTM Ensemble",
        "training_samples": 2450,
        "validation_split": "70/30",
    }


# ─────────────────────────────────────────────────
# 6. PHENOLOGY DATA
# ─────────────────────────────────────────────────
def generate_phenology_data():
    today = datetime.date.today()
    crops_phenology = []
    for crop in CROP_TYPES:
        sowing = today - datetime.timedelta(days=random.randint(90, 120))
        stages = []
        current_day = sowing
        stage_durations = {
            "Sowing": random.randint(5, 10),
            "Germination": random.randint(8, 15),
            "Tillering": random.randint(20, 30),
            "Flowering": random.randint(15, 25),
            "Grain Filling": random.randint(20, 30),
            "Maturity": random.randint(10, 20),
            "Harvest": random.randint(5, 10),
        }
        for stage_name, duration in stage_durations.items():
            start = current_day
            end = current_day + datetime.timedelta(days=duration)
            is_current = start <= today <= end
            stages.append({
                "stage": stage_name,
                "start_date": start.strftime("%Y-%m-%d"),
                "end_date": end.strftime("%Y-%m-%d"),
                "duration_days": duration,
                "is_current": is_current,
            })
            current_day = end

        crops_phenology.append({
            "crop": crop,
            "sos": sowing.strftime("%Y-%m-%d"),
            "peak": (sowing + datetime.timedelta(days=60)).strftime("%Y-%m-%d"),
            "eos": current_day.strftime("%Y-%m-%d"),
            "lgp_days": (current_day - sowing).days,
            "stages": stages,
        })

    return {"phenology": crops_phenology}


# ─────────────────────────────────────────────────
# 7. WATER BALANCE DATA
# ─────────────────────────────────────────────────
def generate_water_balance_data():
    today = datetime.date.today()
    periods = []
    for i in range(8, 0, -1):
        start = today - datetime.timedelta(days=i * 8)
        end = start + datetime.timedelta(days=7)
        et0 = round(random.uniform(3.5, 6.5), 2)
        kc = round(random.uniform(0.4, 1.15), 2)
        etc = round(et0 * kc, 2)
        rainfall = round(max(0, random.gauss(12, 18)), 1)
        actual_et = round(min(etc, rainfall + random.uniform(0, 3)), 2)
        deficit = round(max(0, etc - actual_et), 2)
        periods.append({
            "period_start": start.strftime("%Y-%m-%d"),
            "period_end": end.strftime("%Y-%m-%d"),
            "et0_mm": et0,
            "kc": kc,
            "etc_mm": etc,
            "rainfall_mm": rainfall,
            "actual_et_mm": actual_et,
            "water_deficit_mm": deficit,
            "irrigation_recommended_mm": round(deficit * 0.85, 1),
            "cumulative_deficit_mm": 0,  # will be computed below
        })

    # Compute cumulative
    cum = 0
    for p in periods:
        cum += p["water_deficit_mm"]
        p["cumulative_deficit_mm"] = round(cum, 1)

    return {
        "water_balance": periods,
        "method": "FAO-56 Penman-Monteith (Simplified)",
        "formula": "ETc = ET₀ × Kc; Deficit = ETc − (Rainfall + Actual ET)",
        "command_area": "Karnal Canal Command Area",
        "total_area_ha": 12500,
    }


# ─────────────────────────────────────────────────
# 8. SPECTRAL INDICES MAP
# ─────────────────────────────────────────────────
def generate_spectral_indices(index_name: str, date: str = None):
    base_seed = 45 + hash(index_name) % 100
    seed_val = base_seed if not date else base_seed + hash(date) % 1000
    random.seed(seed_val)
    def props(i, j):
        if index_name == "ndvi":
            val = round(random.uniform(0.15, 0.90), 3)
        elif index_name == "evi":
            val = round(random.uniform(0.10, 0.70), 3)
        elif index_name == "ndwi":
            val = round(random.uniform(-0.3, 0.5), 3)
        elif index_name == "vci":
            val = round(random.uniform(5, 98), 1)
        elif index_name == "smi":
            val = round(random.uniform(0.05, 0.95), 3)
        else:
            val = round(random.uniform(0, 1), 3)
        return {
            "index_name": index_name.upper(),
            "value": val,
        }
    return generate_grid_features(BASE_LAT, BASE_LON, 8, 8, props)
