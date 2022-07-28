function initializeSDK() {
    window.XmBindId.initialize({
        clientId: 'ea854282.0bee69f4.tid_671f9079.bindid.io',
        apiCompat: window.XmBindId.XmBindIdApiCompatibilityLevel.UseLatest
    }).then(res => {
        alert('SDK Initialized');
    });
}


//Quiero morir.jpg

export default function()
function invoke() {
    window.XmBindId.authenticate({
        redirectUri: 'http://127.0.0.1:5500/index',
        scope: [window.XmBindId.XmBindIdScopeType.Phone, window.XmBindId.XmBindIdScopeType.Email],
        verifications: [window.XmBindId.XmRequiredVerifications.Phone, window.XmBindId.XmRequiredVerifications.Email],

        customMessage: 'Login using Your RP',
        loginHint: {
            type: window.XmBindId.XmBindIdLoginHintType.Email,
            value: 'user@email.com'
        }
      }).then(res => {
          onSuccess(res);
      }, err => {
          onFailure(err);
      })
  }
