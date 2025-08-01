<template>
   <Navbar_Student />

    <h1>Hostel Rules and Regulations</h1>
      <div class="marquee-container">
  <div class="marquee-text">
   <p> All students must ensure strict adherence to the hostel rules and regulations to maintain a safe, disciplined, and harmonious living environment.</p>
  </div>
  </div>

  <div class="rules-container">
    <div class="rules-content">
      <ol class="rules-list">
        <li>All students must return to the hostel before 6:00 PM.</li>
        <li>Leave applications must be submitted and approved in advance.</li>
        <li>Visitors are allowed only during visiting hours and must be registered at the reception.</li>
        <li>Noise should be kept to a minimum after 10:00 PM.</li>
        <li>Rooms should be kept clean and are subject to inspection.</li>
        <li>Use of electrical appliances like heaters without permission is prohibited.</li>
        <li>Students must carry their ID cards within the hostel premises.</li>
        <li>Acts of vandalism or theft will result in strict disciplinary action.</li>
        <li>Smoking, alcohol, and illegal substances are strictly prohibited.</li>
        <li>Respect wardens, staff, and fellow students at all times.</li>
      </ol>
    </div>

    <div class="image">
      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgF5xIyXEQTX-i14QP1k2w_MMcHInb-72X1qSf2ioHgplPCoTSiboEfIZUeepZ_WCs1GTbf76zisE-0SOrD9Hoc6bIZ_YunpZzFgoN1GXQf3gUGPHiUYSxn20j1apsjS3U9Ht8dAV95dODQ/s1600/sticky_note_rules.jpg"></img>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar_Student from '@/components/Navbar_Student.vue'
import Footer from '@/components/Footer.vue'

</script>

<style scoped>
.rules-container {
  padding: 20px;
  max-width: 1400px;
  margin-left: 100px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: row;
  gap:90px;
}

 h1 {
  font-size: 2.5rem;
  color: #1BBC9B;
  text-align: center;
  margin-top:40px;
  margin-bottom: 30px;
}

.rules-content {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.rules-list {
  list-style-type: decimal;
  padding-left: 20px;
}

.rules-list li {
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  /* margin-bottom: 10px; */
}

.marquee-text {
  display: inline-block;
  padding-left: 100%;
  animation: scroll-left 15s linear infinite;
  font-size: 1rem;
  color:red;
  font-size: 18px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

</style>