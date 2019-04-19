import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');
const loginApi = require('../../services/Login.Service');
const deleteOrg = require('../../services/Organization.Service');

// CREATE MY NEW ORG HERE
beforeAll(async () => {
  client.maximizeWindow()
  const login = client.page.LoginPage();
  const setup = client.page.AccountSetupPage();
  const org = client.page.UniversalElements();

  // await login.navigate()
  //   .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
  //   .submit()
  //   .pause(2000)
  //   .validateUrlChange('/selectorg')

  // //Use Search to avoid creating org again n again 
  // // await org.searchForOrganization(testConstants.orgName)
  // //   .ccrOrgLogin()
  // //   .pause(2000)

  // // await org.clickLogout()

  // await setup.navigate()
  //   .clickBillingToggle()
  //   .fillInOrgBasicInformation(testConstants.orgName, testConstants.address, testConstants.city,
  //     testConstants.state, testConstants.zip)
  //   .clickCreateOrganization()
  //   .pause(1000)
  //   .getOrgId()

  await login.navigate()
    .enterMemberCreds(testConstants.memberUsername, testConstants.memberPassword)
    .submit()
    .validateUrlChange()
});

// DELETE MY NEW ORG HERE 
afterAll(async (done) => {

  try {
    console.log('Login...');
    const cookie = await loginApi.login();
    console.log('Deleting Org ==', process.env.ORGANIZATION_ID);
    //const archiveResponse = await deleteOrg.archiveOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('======== Organization Archive Response =======');
    // const deleteResponse = await deleteOrg.deleteOrganization(process.env.ORGANIZATION_ID, cookie);
    console.log('====== Organization Deleted =======');
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
});

// //CCR Flow
// import './member'
// import './login'
// import './channels'

// //Member Flow
// import './office'
// import './tags'
// import './outofoffice'
// import './template'
// import './preferences'
import './contact'

// //Member + CCR flow. This should be the last test case
// import './orgProfile'




