import React from 'react'
import '../css/StartForm.css'

const StartForm = () => {
    const isNumberKey = (evt) => { 
        var charCode = (evt.which) ? evt.which : evt.keyCode 
        if (charCode > 31 && (charCode < 48 || charCode > 57)) 
            return false; 
        return true; 
    } 
    return (
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Rows</label>
                <input type="number" class="form-control" placeholder="Enter the number of rows" onkeydown="if(event.key==='.'){event.preventDefault();}"  oninput="event.target.value = event.target.value.replace(/[^0-9]*/g,'');" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Cols</label>
                <input type="number" class="form-control" placeholder="Enter the number of cols" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mines</label>
                <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter the number of mines" />
            </div>
            <button type="submit" class="btn btn-primary">Start</button>
        </form>
    )
}

export default StartForm;