 <template>
  <div>
    <Navbar_warden />
    <div class="approval-container">
      <h2 class="approval-title">Room Change Requests</h2>
      <div class="approval-cards">
 <div v-if="pendingRequests.length > 0">
  <div 
    v-for="request in pendingRequests" 
    :key="request._id" 
    class="request-card">
    <div class="request-content">
  <div class="request-details">
    <p><strong>Student:</strong> {{ request.student.name }}</p>
    <p><strong>Preferred Block:</strong> {{ request.preferredBlock }}</p>
    <p><strong>Preferred Room:</strong> {{ request.preferredRoomNumber }}</p>
    <p><strong>Reason:</strong> {{ request.reason }}</p>
  </div>
  <div class="button-group">
    <button @click="updateStatus(request._id, 'Approved')" class="approve-btn">Approve</button>
    <button @click="updateStatus(request._id, 'Rejected')" class="reject-btn">Reject</button>
  </div>
  <p v-if="successMessageMap[request._id]" class="success-message">
  {{ successMessageMap[request._id] }}
</p>

</div>

  </div>
</div>
<div v-else>
  <p class="no-requests-message">No pending requests to be found.</p>
</div>

</div>
</div>
</div>
  <Footer />
</template>

<script>
import Navbar_warden from '@/components/Navbar_Warden.vue';
import axios from 'axios';
import Footer from '@/components/Footer.vue';

 export default {
  name: 'RoomChangeApproval',
  components: { 
    Navbar_warden,
    Footer 
  },
  data() {
    return {
      requests: [],
      successMessageMap: {} // holds messages by request ID
    };
  },
  async mounted() {
  await this.fetchRequests(); // use the reusable function
  },
 
   methods: {
  async fetchRequests() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/v1/room-change/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.requests = res.data.data;
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  },
 async updateStatus(requestId, status) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `http://localhost:5000/api/v1/room-change/${requestId}/status`,
      { status },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  alert(`You are ${status} the request`);
  this.fetchRequests();
  } catch (error) {
    console.error("Status update error:", error);
    alert("Failed to update status");
  }
}

},

computed: {
  pendingRequests() {
    return this.requests.filter(request => request.status === 'Pending');
  }
}

};
</script>

<style scoped>
.approval-container {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.approval-title {
  color: #00b894;
  text-align: center;
  font-size: 35px;
  margin-bottom: 2rem;
  border-bottom: 3px solid #1BBC9B;
  padding-bottom: 10px;
  max-width: 800px;
  margin-left: 300px;
  margin-right: auto;
}

.approval-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-left: 0%;
}

.request-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 750px;
  transition: 0.3s ease;
  margin-left: 0px;
  line-height: 35px;
  margin-bottom: 10px;
}

.request-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
}

.request-details {
  flex: 1;
  line-height: 2;
}

 .button-group {
  margin-top: 0;      /* Remove extra margin at the top */
  padding-top: 0;     /* Remove extra padding if any */
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.request-card:hover {
  transform: translateY(-5px);
}

.status {
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 8px;
}
 
.approve-btn,
.reject-btn {
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  width:120px;
  font-size: 20px;
  font-weight: 700;
}

.approve-btn {
  background-color: white;
  color: #1BBC9B;
  border: 2px solid #1BBC9B;
}

.reject-btn {
  background-color: white;
  color: #cf1635;
  border: 2px solid red;
}

.approve-btn:hover {
  background-color: #1BBC9B;
  color:white;
  border-style: none;

}

.reject-btn:hover {
  background-color: #c0392b;
  color:white;
  border-style: none;
}

.no-requests-message {
  text-align: center;
  font-size: 25px;
  color: #777;
  margin-top: 4rem;
  font-style: italic;
  margin-bottom: 30px;
}
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 5px;
}

</style>