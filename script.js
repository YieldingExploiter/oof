const path = require('path'),
  fs = require('fs'),
  axios = require('axios');

////////////////////////////////
const VersionsPath = path.resolve(process.env.LOCALAPPDATA,'Roblox','Versions');
const OofOgg = 'https://cdn.discordapp.com/attachments/1004727597621592084/1005511176186236929/ouch.ogg';
const RelativePathToFile = 'content/sounds/ouch.ogg';
////////////////////////////////

(async()=>{
  const versions = fs.readdirSync(VersionsPath)
  for (const version of versions) {
    const vPath = path.join(VersionsPath, version)
    const oggPath = path.join(vPath,RelativePathToFile);
    if (fs.existsSync(oggPath)) {
      console.log('Patching for '+version);
      const writer = fs.createWriteStream(oggPath);
      console.log('Downloading...');
      const rs = await axios({
        responseType: 'stream',
        method: 'get',
        url: OofOgg,
      })
      console.log('Writing....');
      rs.data.pipe(writer)
      await new Promise((res,rej)=>{
        writer.on('error', rej)
        writer.on('finish', res)
      })
      console.log('Done!');
    }
  }
})()