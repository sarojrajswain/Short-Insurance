import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default IdCard = () =>{



  const src = null;
  const required = Asset.fromModule(require('../assets/IDCard.jpg'))
  

    //let src = "https://cdn.pixabay.com/photo/2018/04/07/01/25/tiger-3297540_960_720.png";
    let text ="Kalyan";
    const html = `<div style="display: flex;align-items: center;border-style: dashed;
    border-width: thin; border-radius: 15px; padding:5px; font-size: 15px;">
      <img src=${required.uri}>
      <div style="position: absolute;padding:15px;top: 180px;left: 50px;"> TEST123455677</div>
      <div style="position: absolute;padding:15px;top: 180px;left: 260px;">30/02/2021</div>
      <div style="position: absolute;padding:15px;top: 180px;left: 475px;">30/02/2022</div>
      <div style="position: absolute;padding:15px;top: 250px;left: 50px;">Kalyan Ratna Swain</div>
      <div style="position: absolute;padding:15px;top: 415px;left: 100px;">AB152482586</div>
      <div style="position: absolute;padding:15px;top: 480PX;left: 50PX;">2008</div>
      <div style="position: absolute;padding:15px;top: 480PX;left: 450PX;">Toyota</div>
      <div style="position: absolute;padding:10px;top: 480PX;left: 250PX;">Camry</div>
    </div>`;

    async function generateIDCard() {
      //console.log(IDCard().html);
     
      const { uri } = await Print.printToFileAsync({ html,width:800,height:600 });
      Sharing.shareAsync(uri);
    }
      
    return {generateIDCard};
}