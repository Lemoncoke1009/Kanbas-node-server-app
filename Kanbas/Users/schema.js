import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String,
    trim: true 
  },
  email: { 
    type: String,
    trim: true 
  },
  lastName: { 
    type: String,
    trim: true 
  },
  dob: { 
    type: Date 
  },
  role: {
    type: String,
    enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
    default: "USER",
    required: true
  },
  loginId: String,
  section: String,
  lastActivity: { 
    type: Date,
    default: Date.now 
  },
  totalActivity: String
}, { 
  collection: "users",
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export default userSchema;