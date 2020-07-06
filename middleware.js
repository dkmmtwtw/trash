let sprintf=require("sprintf").sprintf;

const middleware = (req, res, next) => {
    let dat = Date().split(' ')[4];
    let obj = {
        date:dat,
        method: req.method,
        url: req.url,
        ip: req.ip,
        hatterszin: ((d)=>{ 
            let perc = (()=> {
                let n = ~~dat.split(':')[2]-30
                let mask = n >>31;
                return (n ^ mask) - mask;
            })();
            let red = (perc)**(Math.log(255)/Math.log(30));
            let green = perc/30*255;
            return ~~red+";"+~~green+";255"
        })(dat)
    }
    console.log("\x1b[38;2;"+obj.hatterszin+"m"+sprintf('[%-8s]\x1b[38;2;150;150;150m %-5s %-30s %-10s\x1b[0m', obj.date,obj.method,obj.url,obj.ip));
    next();
}
module.exports = {
    middleware
}