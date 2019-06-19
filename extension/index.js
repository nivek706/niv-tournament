//import challonge_api from './challonge_api';
const nodecgApiContext = require("./util/nodecg-api-context");
module.exports = (nodecg) => {
    nodecgApiContext.set(nodecg);
    init().then(() => {
        nodecg.log.info('Init success');

    }).catch(error => {
        nodecg.log.error('Init failed', error);
    });
};

async function init() {
    require('./ChallongeConnector.js');
    require('./SpotifyConnector.js');
}