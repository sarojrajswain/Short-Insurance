
export default IdCard = () =>{
    let src = "https://cdn.pixabay.com/photo/2018/04/07/01/25/tiger-3297540_960_720.png";
    let text ="Kalyan";
    const html = `<div style="display: flex;align-items: center;border-style: solid; width:300px;height:200px; border-radius: 25px;">
     <img src=${src}>
     <h1>${text}</h1>
      </div>`;
      
    return {html};
}