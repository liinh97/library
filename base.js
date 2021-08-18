const response = (status, data = null) => {

    if(status){

        return {
            status: true,
            message: "Success",
            data: data,
        }

    }else{

        return {
            status: false,
            message: data ?? "Fails",
            data: null,
        }
        
    }
    
}

module.exports = { response };