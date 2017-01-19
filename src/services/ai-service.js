
// Only for tests
// This token should be read from env vars
// or through a config file.
const TOKEN_ID = "123";

const StatusService = {
  BUSY: 1,
  AVAILABLE: 2
};

class AIService {

  constructor() {

    this.tokenID = "";
    this.ais;
    this.isInGame = false;

    // Read the token from a file / env var
    this.tokenID = TOKEN_ID;
  }

  /**
   * Return the current status of the IA
   * @param token A token to verify service identity
   */
  getStatus(token) {
    if (this.tokenID !== token) {
      return null;
    }
    let st = this.isInGame ? StatusService.BUSY : StatusService.AVAILABLE;
    return { status: st, token: this.tokenID };    
  }
}

module.exports = new AIService();