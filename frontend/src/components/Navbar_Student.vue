<template>
  <nav class="navbar" :class="{ 'dark-theme': isDarkTheme }">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <font-awesome-icon :icon="['fas', 'users']" />
        Hostel Buddy
      </router-link>

      <!-- Dark Mode Toggle -->
      <button @click="toggleTheme" class="theme-toggle">
        {{ isDarkTheme ? '☀' : '🌙' }}
      </button>

      <!-- Menu Toggle for mobile -->
      <div class="menu-toggle" @click="toggleMenu">
        <span :class="{ bar: true, active: isOpen }"></span>
        <span :class="{ bar: true, active: isOpen }"></span>
        <span :class="{ bar: true, active: isOpen }"></span>
      </div>

      <!-- Nav Menu -->
      <ul class="nav-menu" :class="{ active: isOpen }">
        <li class="nav-item">
          <router-link to="/hostel-buddy" class="nav-links">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/student-dashboard" class="nav-links">Dashboard</router-link>
        </li>
        <li class="nav-item quick-action">
          <div class="quick-action-icon" @click="toggleQuickActions">☰</div>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Quick Action Drawer -->
  <div class="quick-action-drawer" :class="{ active: showQuickActions }">
    <div class="drawer-content">
      <div class="drawer-header">
        <span>Quick Actions</span>
        <button class="drawer-close" @click="toggleQuickActions">&times;</button>
      </div>
      <ul class="drawer-menu">
        <li><router-link to="/announcements"><i class="fas fa-bullhorn"></i>Announcements</router-link></li>
        <li><router-link to="/payments"><i class="fas fa-rupee-sign"></i>Pay Fee</router-link></li>
        <li><router-link to="/apply"><i class="fas fa-bed"></i>Apply for Room</router-link></li>
        <li><router-link to="/change-request"><i class="fas fa-exchange-alt"></i>Change Room</router-link></li>
        <li><router-link to="/complaints"><i class="fas fa-tools"></i>Raise Issue</router-link></li>
        <!-- <li><router-link to="/cancel-meal"><i class="fas fa-utensils"></i>Cancel Meal</router-link></li> -->
        <li><router-link to="/apply-leave"><i class="fas fa-calendar-alt"></i>Apply Leave</router-link></li>
        <li><router-link to="/menu"><i class="fas fa-utensils"></i>Check Menu</router-link></li>
        <!-- <li><router-link to="/feedback"><i class="fas fa-comment-dots"></i>Meal Feedback</router-link></li> -->
        <li><router-link to="/fee-details"><i class="fas fa-money-bill-wave"></i>Fee Details</router-link></li>
        <li><router-link  to="/rules"><i class="fas fa-edit"></i>Rules and Regulations</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Navbar_Student',
  setup() {
    const isOpen = ref(false);
    const isDarkTheme = ref(false);
    const showQuickActions = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      localStorage.setItem('darkTheme', isDarkTheme.value ? 'dark' : 'light');
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { isDark: isDarkTheme.value }
      }));
    };

    const toggleQuickActions = () => {
      showQuickActions.value = !showQuickActions.value;
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme) {
        isDarkTheme.value = savedTheme === 'dark';
      }
    });

    return {
      isOpen,
      isDarkTheme,
      showQuickActions,
      toggleMenu,
      toggleTheme,
      toggleQuickActions
    };
  }
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  max-width: 1500px;
  padding: 0 24px;
}

.navbar-logo {
  color: #1BBC9B;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
}

.theme-toggle {
  background-color: #44D4C5;
  color: #1A1C2D;
  border: none;
  border-radius: 5px;
  padding: 0px 10px;
  margin-top: 28px;
  height: 30px;
  margin-left: auto;
  margin-right: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  height: 40px;
  width: 50px;
}

.menu-toggle {
  display: none;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .menu-toggle {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: #333;
    transition: all 0.3s ease-in-out;
  }

  .bar.active:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .bar.active:nth-child(2) {
    opacity: 0;
  }

  .bar.active:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
}

.nav-item {
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
}

.nav-links {
  color: #333;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: all 0.3s ease;
}

.nav-links:hover {
  color: #1BBC9B;
}

.nav-links.router-link-exact-active {
  color: #1BBC9B;
  border-bottom: 3px solid #1BBC9B;
}

.quick-action-icon {
  font-size: 1.6rem;
  cursor: pointer;
  padding: 0 10px;
  user-select: none;
  background-color: #1BBC9B;
  border-radius: 5px;
  height:40px;
  width:45px;
  color:white;
}

.quick-action-drawer {
  position: fixed;
  top: 0; /* Attach to very top of page */
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 2000;
  overflow: hidden;
}

.quick-action-drawer.active {
  transform: translateX(0);
}

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #1BBC9B;
  color: #fff;
  font-weight: bold;
  height:100px;
  padding-left: 30px;
  font-size: 18px;
}

.drawer-close {
  background: transparent;
  border: none;
  font-size: 2.5rem;
  color: #fff;
  cursor: pointer;
  padding-right: 30px;
}

.drawer-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex-grow: 1;
  line-height: 30px;
}

.drawer-menu li {
  border-bottom: none; /* Removed dividing lines */
}

.drawer-menu li a {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.2s ease-in-out;
}

.drawer-menu li a i {
  margin-right: 12px;
  color: #17c89d;
}

.drawer-menu li a:hover {
  background-color: #f0f0f0;
  color: #1BBC9B;
}

.navbar.dark-theme {
  background-color: #1A1C2D;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.navbar.dark-theme .nav-links {
  color: #e0e0e0;
}

.navbar.dark-theme .nav-links:hover {
  color: #44d4c5;
}

.navbar.dark-theme .nav-links.router-link-exact-active {
  color: #44d4c5;
  border-bottom: 3px solid #44d4c5;
}

.navbar.dark-theme .navbar-logo {
  color: #44d4c5;
}

.navbar.dark-theme .bar {
  background-color: #e0e0e0;
}

.navbar.dark-theme + .quick-action-drawer {
  background-color: #2E3047;
}

.navbar.dark-theme + .quick-action-drawer .drawer-header {
  background: #3a3d5a;
  color: #eee;
}

.navbar.dark-theme + .quick-action-drawer .drawer-menu li a {
  color: #eee;
}

.navbar.dark-theme + .quick-action-drawer .drawer-menu li a:hover {
  background-color: #3a3d5a;
  color: #44d4c5;
}
</style>