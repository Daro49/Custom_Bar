<template>
  <div class = "button-group">
    <button class="btn">
      <RouterLink to="/menu">Menu</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/jukebox">Jukebox</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/coupons">Coupons</RouterLink>
    </button>
  </div>

  <div class ="bottom-button-group">
    <button class="btn-bottom">
      <RouterLink to="/map">Map</RouterLink>
    </button>
    <button class="btn-bottom">
      <RouterLink to="/customdrink">Custom Drink</RouterLink>
    </button>
    <button class="btn-bottom">
      <RouterLink to="/menu/order">Order</RouterLink>
    </button>
  </div>
</template>

<style scoped>
.button-group {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  background-color: #D4AF37;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
}

.bottom-button-group {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.btn-bottom {
  background-color: #D4AF37;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
}
</style>