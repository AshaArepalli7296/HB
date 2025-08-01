<template>
  <Navbar_Student />
  <div class="request-container1">
    <div class="request-container">
      <div class="cards-wrapper">
        <!-- Complaint Form -->
        <div class="form-card">
          <h1 class="center-heading">Complaint Submission</h1>

          <div class="complaint-section">
            <div class="form-group">
              <label>Complaint Type:</label>
              <select v-model="complaintType" class="form-input">
                <option disabled value="">Select complaint type</option>
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Furniture</option>
                <option>Cleaning</option>
                <option>Other</option>
              </select>
            </div>

            <div class="form-group">
              <label>Description:</label>
              <textarea
                v-model="complaintDescription"
                placeholder="Please describe your complaint in detail..."
                rows="4"
                class="form-input"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Upload Photo (Optional):</label>
              <input type="file" @change="handleFileUpload" accept="image/*" class="form-input" />
            </div>

            <div class="submit-wrapper">
              <button @click="submitComplaint" class="submit-btn">Submit Complaint</button>
            </div>
          </div>
        </div>

        <!-- Status Tracker -->
      
      </div>

      <!-- Complaint History List -->
      <div class="complaint-history" v-if="complaints.length > 0">
        <h2>All Complaints</h2>
        <table class="complaint-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in complaints" :key="c._id">
              <td>{{ index + 1 }}</td>
              <td>{{ c.category }}</td>
              <td>{{ c.description }}</td>
              <td>{{ c.status }}</td>
              <td>{{ formatDate(c.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar_Student from '../../../../components/Navbar_Student.vue';
import Footer from '../../../../components/Footer.vue';
import axios from 'axios';

export default {
  name: 'ComplaintSystem',
  components: { Footer, Navbar_Student },
  data() {
    return {
      complaintType: '',
      complaintDescription: '',
      uploadedPhoto: null,
      statusStep: 1,
      currentComplaint: null,
      complaints: []
    };
  },
  methods: {
    handleFileUpload(event) {
      this.uploadedPhoto = event.target.files[0];
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('en-IN');
    },
    async fetchStudentComplaints() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/v1/complaints/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.complaints = res.data.data;

    if (this.complaints.length > 0) {
      this.currentComplaint = this.complaints[0];

      switch (this.currentComplaint.status) {
        case 'In Progress':
          this.statusStep = 2;
          break;
        case 'Resolved':
          this.statusStep = 3;
          break;
        default:
          this.statusStep = 1;
      }
    }
  } catch (err) {
    console.error('❌ Error fetching student complaints:', err);
  }
},
    async submitComplaint() {
      const token = localStorage.getItem('token');

      if (!this.complaintType || !this.complaintDescription) {
        alert('Please fill in all fields.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('category', this.complaintType);
        formData.append('description', this.complaintDescription);

        if (this.uploadedPhoto) {
          formData.append('image', this.uploadedPhoto);
        }

        await axios.post('/api/v1/complaints', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        alert('Complaint submitted successfully!');
        this.resetComplaintForm();
        this.fetchStudentComplaints(); // Refresh list
      } catch (err) {
        console.error('Complaint submission error:', err);
        alert(err.response?.data?.message || 'Failed to submit complaint.');
      }
    },
    resetComplaintForm() {
      this.complaintType = '';
      this.complaintDescription = '';
      this.uploadedPhoto = null;
    }
  },
  mounted() {
    this.fetchStudentComplaints();
  }
};
</script>



<style scoped>
.request-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.center-heading {
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
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  padding: 30px;
  width:800px;
}

.form-card {
  flex: 1;
 
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #1BBC9B;
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 188, 155, 0.2);
}

textarea.form-input {
  min-height: 100px;
  resize: vertical;
}

.request-container1 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

padding: 3rem 2rem;
  background: linear-gradient(to bottom, 
    #e0f8f6 0%, 
    #f0fdfc 30%, 
    #ffffff 50%, 
    #f0fdfc 70%, 
    #e0f8f6 100%);
 position: relative;
  overflow: hidden;}

.step-content {
  padding-left: 20px;
}

.step-content h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.step-content p {
  margin: 0;
  color: #777;
}

.current-status {
  margin-top: 30px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.current-status h3 {
  margin-top: 0;
  color: #1BBC9B;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.submit-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.submit-btn {
  background: #1BBC9B;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 200px;
}

.submit-btn:hover {
  background: #15967D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(27, 188, 155, 0.3);
}

@media (max-width: 992px) {
  .cards-wrapper {
    flex-direction: column;
  }
  
  .status-card {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .request-container {
    padding: 20px;
  }
  
  .form-card, .status-card {
    padding: 20px;
  }
}
.complaint-history {
  margin-top: 40px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.history-heading {
  font-size: 22px;
  color: #1BBC9B;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.history-card {
  padding: 15px;
  margin-bottom: 15px;
  background: #f9f9f9;
  border-radius: 10px;
  border-left: 5px solid #1BBC9B;
}

.complaint-image {
  margin-top: 10px;
  max-width: 100px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

</style>