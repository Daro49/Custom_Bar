<template>
  <div class="package-card">
    <div class="package-text-frame">
      <p class="package-text">{{ name }}</p>
    </div>

    <div class="package-img">
      <img :src="img" />
    </div>

    <div class="package-price">
      <span class="price-label">Price:</span>
      <span class="price-value">{{ price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.package-card {
  background: var(--wood);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 10px;
  width: 280px;
}

.package-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  height: 224px;
  width: 100%;
}

.package-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.package-text-frame {
  text-align: center;
  font-family: var(--button-font-family);
  font-size: 24px;
  color: white;
  margin-bottom: 8px;
}

.package-price {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-family: var(--button-font-family);
  font-size: 24px;
  color: white;
}

.price-label {
  font-weight: 500;
}

.price-value {
  font-weight: 700;
  color: var(--gold);
}
</style>
