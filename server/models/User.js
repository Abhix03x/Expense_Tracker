import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        fullName :{type:String,required:true},
        email : {type:String,required:true,unique:true},
        password : { type : String , required : true },
        profileImageUrl : {type: String ,default : null}
    },
    {timestamps : true}
);

// Hash Password

UserSchema.pre("save",async function (){
    if(!this.isModified("password") ) return ;
    this.password = await bcrypt.hash(this.password,10);
    
});

//compare password

UserSchema.methods.comparePasswords = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

export default mongoose.model("User",UserSchema);