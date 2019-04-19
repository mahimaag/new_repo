import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox');

describe('Automated Tests: Channels', () => {
  test('login as ccr into the organization', async () => {
    const login = client.page.LoginPage();
    const org = client.page.UniversalElements();

    await login.navigate()
      .enterCSRCreds(testConstants.ccrLogin, testConstants.ccrPassword)
      .submit()
      .pause(2000)
      .validateUrlChange('/selectorg')

    await org.searchForOrganization(testConstants.orgName)
      .ccrOrgLogin()
      .pause(2000)
  });

  test('Required Fields and validations', async () => {
    const channel = client.page.ChannelsPage();
    const setup = client.page.ChannelsCreateEditPage();


    await channel.navigate()
      .validateChannelsEls()

    await setup.navigate()
      .selectChannelCategory('@newPhoneType')
      .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
      .waitForElementVisible('@channelNameValidation', 'Validation message for channel Name is visible')
      .verify.visible('@timezoneValidation', 'Validation message for TimeZone is visible')
      .verify.visible('@channelRouteValidation', 'validation message for Channel Route is visible')

    await setup.navigate()
      .selectChannelCategory('@rhinoSecureType')
      .createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
      .waitForElementVisible('@channelNameValidation', 'Validation message for channel Name is visible')
      .verify.visible('@timezoneValidation', 'Validation message for TimeZone is visible')
      .verify.visible('@channelRouteValidation', 'validation message for Channel Route is visible')
  });

  test('Channel Create - New Phone type with member Route', async () => {
    const newPhone = client.page.ChannelsCreateEditPage();
    const route = client.page.ChannelRouteMemberContainer();

    await newPhone.navigate()
      .validateCreateEls()
      .selectChannelCategory('@newPhoneType')
      .pause(2000)
      .addNumber(testConstants.numberForNewPhoneChannel, testConstants.forwardingNumber)
      .channelDetails(testConstants.channelName, testConstants.channelPurpose, testConstants.timeZone)

    await route.routeSearch('@memberInput', testConstants.memberFirstName, '@memberResult')
      .pause(2000)

    await newPhone.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
      .checkSuccessMessage('@channelCreateSuccessMessage')
  });

  test('Channel Create - Rhinosecure channel with member route', async () => {
    const rhino = client.page.ChannelsCreateEditPage();
    const route = client.page.ChannelRouteMemberContainer();

    await rhino.navigate()
      .validateCreateEls()
      .selectChannelCategory('@rhinoSecureType')
      .channelDetails(testConstants.rhinoChannelName, testConstants.channelPurpose, testConstants.timeZone)

    // await route.selectGroupRoute()
    //     .routeSearch('@groupInput', testConstants.groupName, '@groupResult')
    //     .pause(2000)

    await route.routeSearch('@memberInput', testConstants.memberFirstName, '@memberResult')
      .pause(2000)

    await rhino.createUpdateChannel('@createChannelButton', 'Create Channel button is visible.')
      .pause(2000)
      .checkSuccessMessage('@channelCreateSuccessMessage')
      .waitForElementNotPresent('@channelCreateSuccessMessage')
  });

  test('Channel Edit - New phone type', async () => {
    const channel = client.page.ChannelsPage();
    const update = client.page.ChannelsCreateEditPage();

    await channel.navigate()

      .channelEditMode('@channelName')

    await update.editChannelDetailsSection(testConstants.newChannelName, testConstants.newPurpose)
      .enableDisableToggles('@availabilityHoursToggle')
      .enableDisableToggles('@webFormAddOnnToggle')
      .enableDisableToggles('@channelForwardingToggle')
    update.createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
      .checkSuccessMessage('@channelUpdateSuccessMessage')
      .waitForElementNotPresent('@channelUpdateSuccessMessage')
  });

  test('Channel Edit - Rhinosecure', async () => {
    const channel = client.page.ChannelsPage();
    const update = client.page.ChannelsCreateEditPage();

    await channel.navigate()
      .channelEditMode('@rhinoSecureChannelTitle')

    await update.editChannelDetailsSection(testConstants.rhinoChannelNewName, testConstants.newPurpose)
      .enableDisableToggles('@availabilityHoursToggle')
      .enableDisableToggles('@channelForwardingToggle')
      .pause(2000)
      .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
      .checkSuccessMessage('@channelUpdateSuccessMessage')
      .waitForElementNotPresent('@channelUpdateSuccessMessage')
  });

  test('Tags creation for newPhone type and Rhino secure type', async () => {
    const channel = client.page.ChannelsPage();
    const update = client.page.ChannelsCreateEditPage();

    await channel.navigate()
      .channelEditMode('@updatedChannelTitle')

    await update.addtag(testConstants.tagNameNewPhoneType, '@tagCategory')
      .pause(2000)
      .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
      .checkSuccessMessage('@channelUpdateSuccessMessage')

    await channel.channelEditMode('@updatedRhinoSecureChannelTitle')

    await update.addtag(testConstants.tagNameRhinoType, '@tagCategory')
      .pause(2000)
      .createUpdateChannel('@updateChannelButton', 'update channel button is visible.')
      .checkSuccessMessage('@channelUpdateSuccessMessage')
  });

  test('validation on Web Form fields', async () => {
    const channel = client.page.ChannelsPage();
    const channel1 = client.page.ChannelsCreateEditPage();


    await channel.channelEditMode('@updatedChannelTitle')

    await channel1.webFormValidation('@formTitle')
      .webFormValidation('@titleSubtext')
      .webFormValidation('@phonePlaceholder')
      .webFormValidation('@phoneHelpText')
      .webFormValidation('@messagePlaceholder')
      .webFormValidation('@submitButton')
      .webFormValidation('@callToActionButton')
      .webFormValidation('@confirmationText')

      .createUpdateChannel('@updateChannelButton')

      .checkForValidation('@titleValidationMessage')
      .checkForValidation('@titleSubtextValidation')
      .checkForValidation('@phonePlaceholderMessage')
      .checkForValidation('@phoneHelpTextMessage')
      .checkForValidation('@messagePlaceholderValidation')
      .checkForValidation('@buttonTitleMessage')
      .checkForValidation('@actionButtonTitleMessage')
      .checkForValidation('@confirmationTextMessage')
  });

  test('Updation on Web Form fields', async () => {
    const channel = client.page.ChannelsPage();
    const channel1 = client.page.ChannelsCreateEditPage();

    channel.navigate()
    await channel.channelEditMode('@updatedChannelTitle')

    await channel1.updateWebform('@formTitle', testConstants.formTitleName)
      .updateWebform('@titleSubtext', testConstants.titleSubtext)
      .updateWebform('@phonePlaceholder', testConstants.phonePlaceholder)
      .updateWebform('@phoneHelpText', testConstants.phoneHelpText)
      .updateWebform('@messagePlaceholder', testConstants.messagePlaceHolder)
      .updateWebform('@submitButton', testConstants.submitButton)
      .updateWebform('@callToActionButton', testConstants.callToActionButton)
      .updateWebform('@confirmationText', testConstants.callToActionButton)
      .pause(2000)
      .waitForElementVisible('@updateChannelButton', 'update button is visible')
      .click('@updateChannelButton')
  });

  // test('Channel Deletion', async () => {
  //   const channel = client.page.ChannelsPage();
  //   const deletechannel = client.page.ChannelsCreateEditPage();

  //   await channel.navigate()
  //     .channelEditMode('@updatedChannelTitle')

  //   await deletechannel.deleteChannels()
  //     .pause(2000)
  //   await channel.navigate()
  //     .channelEditMode('@updatedRhinoSecureChannelTitle')

  //   await deletechannel.deleteChannels()
  //     .pause(2000)
  // });

  test('logout as CCR', async () => {
    const logout = client.page.UniversalElements();

    await logout.clickLogout();
  });
  
});
