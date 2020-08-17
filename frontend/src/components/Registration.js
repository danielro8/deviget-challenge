import React from 'react'

const Registration = () => {
    return (
        <div class="container register-form">
        <div class="form">
            <div class="note">
                <p>Register your account here.</p>
            </div>

            <div class="form-content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="email *" value=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Password *" value=""/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Confirm Password *" value=""/>
                        </div>
                    </div>
                </div>
                <button type="button" class="btnSubmit">Submit</button>
            </div>
        </div>
    </div>
    );
  }
  
  
  export default Registration;