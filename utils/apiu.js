class apiu{
    constructor(apicontext,logins){
        this.apicontext=apicontext;
        this.logins=logins
    }
    async goto()
    {
      const loginresponses=  await this.apicontext.post("",{data:this.logins});
        const token= await loginresponses.json();
        console.log(token);
        return token;
    }
}
module.exports={apiu};