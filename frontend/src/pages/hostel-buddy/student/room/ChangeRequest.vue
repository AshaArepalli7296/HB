<template>
  <Navbar_Student/>
  <div class="room-change-container">
    <h1>Room Change Request</h1>
    
    <div class="cards-wrapper">
      <!-- Left Card - Request Form -->
      <div class="form-card">
        <!-- <div class="current-room">
          <h3>Your Current Room</h3>
          <div class="room-info">
            <span><strong>Room :</strong> {{ currentRoom.room }}</span>
            <span><strong>Block :</strong> {{ currentRoom.block }}</span>
          </div>
        </div> -->

        <form @submit.prevent="submitRequest" class="request-form">
          <div class="form-group">
            <label for="preferred-block">Preferred Block</label>
            <select id="preferred-block" v-model="formData.preferredBlock" required>
              <option value="">Select Block</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
            </select>
          </div>

          <div class="form-group">
            <label for="preferred-room">Preferred Room Number</label>
            <input 
              type="text" 
              id="preferred-room" 
              v-model="formData.preferredRoomNumber" 
              placeholder="e.g. B-305" 
              required>
          </div>

          <div class="form-group">
            <label for="reason">Reason for Change</label>
            <textarea 
              id="reason" 
              v-model="formData.reason" 
              rows="4" 
              placeholder="Please explain your reason for requesting a room change..."
              required
            ></textarea>
          </div>

          <div class="form-buttons">
            <button type="submit" class="submit-btn">Submit Request</button>
            <button type="button" class="submit-btn view-history-btn" @click="showHistoryModal = true">View History</button>
          </div>
        </form>
      </div>

      <!-- Right Card - Status Process (commented out) -->
      <!-- 
      <div v-if="latestRequest">
        <div class="status-process-card">
          <h3>Request Status</h3>
          <div class="process-steps">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep >= 1 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <div class="step-title">Pending</div>
                <div class="step-description">Request submitted for review</div>
              </div>
              <div class="step-check" v-if="currentStep >= 1">✓</div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep >= 2 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <div class="step-title">Approved</div>
                <div class="step-description">Request approved by admin</div>
              </div>
              <div class="step-check" v-if="currentStep >= 2">✓</div>
            </div>
            
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep >= 3 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <div class="step-title">Rejected</div>
                <div class="step-description">Request not approved</div>
              </div>
              <div class="step-check" v-if="currentStep >= 3">✓</div>
            </div>
          </div>
        </div>
      </div>
      -->

      <div v-if="showHistoryModal" class="modal-overlay">
        <div class="history-popup">
          <span class="close-icon" @click="showHistoryModal = false">×</span>
          <h3>Your Room Change History</h3>
          <div v-if="requestHistory.length === 0">
            <p>No history found.</p>
          </div>
          <div v-else>
            <div
              v-for="(item, index) in requestHistory"
              :key="item._id"
              class="history-modal-content">
              <div class="history-box" :class="getStatusClass(item.status)">
                <p><strong>Preferred Block:</strong> {{ item.preferredBlock }}</p>
                <p><strong>Preferred Room:</strong> {{ item.preferredRoomNumber }}</p>
                <p><strong>Reason:</strong> {{ item.reason }}</p>
                <p><strong>Date:</strong> {{ formatDate(item.createdAt) }}</p>
                <p><strong>Status:</strong> {{ item.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div> <!-- End cards-wrapper -->
  </div>
  <Footer/>
</template>

 
<script>
import axios from 'axios'; 
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';

export default {
  name: 'RoomChangeRequest',
  components: {
    Navbar_Student,
    Footer
  },
  data() {
    return {
      formData: {
        preferredBlock: '',
        preferredRoomNumber: '',
        reason: ''
      },
      latestRequest: null,
      currentStep: 0,// 0 = No request, 1 = Pending, 2 = Approved, 3 = Rejected

      currentRoom: {
      room: '',
      block: '',
      floor: '',
      // bedType: ''
    },
    showHistoryModal: false,
    requestHistory: [],
    justSubmitted: false,
    };
  },
  methods: {
getStatusClass(status) {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'border-pending';
    case 'approved':
      return 'border-approved';
    case 'rejected':
      return 'border-rejected';
    default:
      return '';
  }
},

async submitRequest() {
       const token = localStorage.getItem('token');
     const config = {
       headers: {
      Authorization: `Bearer ${token}`
    }
  };
      try {
        const { preferredBlock, preferredRoomNumber, reason } = this.formData;

        await axios.post('/api/v1/room-change', {
          preferredBlock,
          preferredRoomNumber,
          reason,
        },config);

        this.latestRequest = {
          preferredBlock: this.block,
          preferredRoomNumber: this.roomNumber,
          reason: this.reason,
         createdAt: new Date().toISOString(),
         status: "Pending",
        };
        this.showLatest = true;

       alert('Room change request submitted!');
        this.formData = { preferredBlock: '', preferredRoomNumber: '', reason: '' };
        this.fetchRequestHistory();
         this.justSubmitted = true;
      } catch (error) {
        alert('Error submitting request');
        console.error(error);
      }
    },
    async fetchLatestRequest() {
       const token = localStorage.getItem('token');
       const config = {
         headers: {
      Authorization: `Bearer ${token}`
    }
  };
    try {
      const res = await axios.get('http://localhost:5000/api/v1/room-change/latest',config);
      this.latestRequest = res.data;

       const status = res.data?.status?.toLowerCase();
if (!status) {
  this.currentStep = 0;
  return;
}

switch (status) {
  case 'pending':
    this.currentStep = 1;
    break;
  case 'approved':
    this.currentStep = 2;
    break;
  case 'rejected':
    this.currentStep = 3;
    break;
  default:
    this.currentStep = 0;
}
} catch (err) {
      console.error("Error fetching latest request:", err);
      const status = res.data?.status?.toLowerCase();
      this.currentStep = 0;
    }
    },

   async fetchStudentRoomDetails() {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/users/me');
      const user = response.data;

      this.currentRoom.room = user.roomNumber || 'N/A';
      this.currentRoom.block = user.block || 'N/A';
      this.currentRoom.floor = user.floor || 'N/A';
      this.currentRoom.bedType = user.bedType || 'Single Bed (3ft x 6ft)';
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  },

  async fetchRequestHistory() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const res = await axios.get('http://localhost:5000/api/v1/room-change/history', config);
    this.requestHistory = res.data;
  } catch (error) {
    console.error("Failed to fetch request history:", error);
  }
},
formatDate(date) {
  return new Date(date).toLocaleDateString();
}

},
created() {
    this.fetchLatestRequest();
    this.fetchStudentRoomDetails(); // fetch current room details
    this.fetchRequestHistory();
  },
};
</script>

<style scoped>
.room-change-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  color: #1BBC9B;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #1BBC9B;
  padding-bottom: 10px;
}

.cards-wrapper {
  display: flex;
  gap: 30px;
}

.form-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 25px;
  width:1000px;
}

.status-process-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 25px;
  flex: 1;
  max-width: 350px;
}

h3 {
  color: #1BBC9B;
  margin-bottom: 15px;
}
.current-room {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center; /* Added center alignment */
}
.current-room h3{
  font-size: 20px;
}
.room-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  align-items: center; /* Center align items horizontally */
}

.request-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #555;
}

input, select, textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #1BBC9B;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  width: 200px;
  align-self: center;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(27, 188, 155, 0.2);
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  padding-bottom: 20px;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 16px;
  top: 36px;
  bottom: -20px;
  width: 2px;
  background: #e0e0e0;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  z-index: 1;
}

.step-content {
  flex-grow: 1;
}

.step-title {
  font-weight: 600;
  color: #666;
  margin-bottom: 4px;
}

.step-description {
  font-size: 14px;
  color: #999;
}

.step-check {
  color: white;
  background: #1BBC9B;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

/* Active step styling */
.step.active .step-number {
  background: #1BBC9B;
  color: white;
}

.step.active .step-title {
  color: #1BBC9B;
}

/* Completed step styling */
.step.completed .step-number {
  background: #1BBC9B;
  color: white;
}

.step.completed .step-title {
  color: #1BBC9B;
}

.step.completed::after {
  background: #1BBC9B;
}

@media (max-width: 768px) {
  .room-change-container {
    padding: 20px;
  }
  
  .cards-wrapper {
    flex-direction: column;
  }
  
  .form-card, .status-process-card {
    padding: 20px;
    max-width: 100%;
  }
}

.modal-content-stacked {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
 
.history-card {
  /* border-left: 5px solid #1BBC9B; */
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #f4f4f4;
}
 

/* .status.pending {
  color: #FFA500;
  font-weight: bold;
}

.status.approved {
  color: #28a745;
  font-weight: bold;
}

.status.rejected {
  color: #dc3545;
  font-weight: bold;
} */
 

.history-btn-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.history-btn-wrapper .submit-btn {
  background-color: #1BBC9B;
  width: 150px;
}

 
.close-icon {
  position: absolute;
  top: 18px;
  right: 28px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #dc3545;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1001;
  transition: all 0.2s ease-in-out;
  margin-top: 18px;
}

.close-icon:hover {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.history-popup {
  position: relative;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.history-popup h3{
  text-align: center;
  font-size: 30px;
  margin-right: 20px;
  margin-top: 30px;
}

.history-popup p{
   font-size: 17px;
  margin-top: 60px;
  font-style: italic;
  color:#666;
}

.history-modal-content {
  text-align: left;
  line-height: 1.4;        
}

.history-modal-content p {
  margin: 4px 0;          /* Tighter spacing between paragraphs */
}
.history-box {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* ✅ Box shadow added */
  margin-bottom: 20px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.view-history-btn {
  background-color: #1BBC9B;
  width: 200px;
}

.recent-request-box {
  margin-top: 30px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  font-size: 15px;
  transition: box-shadow 0.3s ease;
  width:350px;
}
.recent-request-box h4{
  color:#1BBC9B;
  text-align: center;
  font-size: 20px; 
  margin-bottom: 10px; 
}

.border-pending {
  border-left: 6px solid #f4c430; /* Yellow */
}

.border-approved {
  border-left: 6px solid #28a745; /* Green */
}

.border-rejected {
  border-left: 6px solid #dc3545; /* Red */
}

</style> 