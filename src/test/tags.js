import { client } from 'nightwatch-api';
const testConstants = require('../../toolboxes/feeder.toolbox'),
  entry = client.page.AuditLogsPage(),
  tag = client.page.TagsPage();

describe('CRUDing Tags by Member', () => {

  test('Cruding for Location Type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryLocation', testConstants.locationName, '@locationTag')
    await entry.navigate() //checking audit log page
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.locationName, '')
    await tag.navigate()
    .pause(500)
      .editTag('@locationTag', testConstants.newLocation, '@locationEditedTag')
    await entry.navigate()
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Edit', testConstants.newLocation, '')
    await tag.navigate()
    .pause(500)
      .deleteTag('@locationEditedTag')
    await entry.navigate()
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Delete', testConstants.newLocation, '')
  });

  test('cruding for Department type', async () => {
    await tag.navigate()
    .pause(500)
      .createNewTag('@tagCategoryDepartment', testConstants.departmentName, '@departmentTag')
    await entry.navigate() //checking audit log page
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.departmentName)
    await tag.navigate()
    .pause(500)
      .editTag('@departmentTag', testConstants.newDepartment, '@departmentEditedTag')
    await entry.navigate()
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Edit', testConstants.newDepartment)
    await tag.navigate()
    .pause(500)
      .deleteTag('@departmentEditedTag')
    await entry.navigate()
    .pause(2000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Delete', testConstants.newDepartment)
  });

  test('cruding for Role type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryRole', testConstants.roleName, '@roleTag')
    await entry.navigate() //checking audit log page
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.roleName)
    await tag.navigate()
      .editTag('@roleTag', testConstants.newRole, '@roleEditedTag')
    await entry.navigate()
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Edit', testConstants.newRole)
    await tag.navigate()
      .deleteTag('@roleEditedTag')
    await entry.navigate()
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Delete', testConstants.newRole)
  });

  test('cruding for Custom type', async () => {
    await tag.navigate()
      .createNewTag('@tagCategoryCustom', testConstants.customName, '@customTag')
    await entry.navigate() //checking audit log page
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Add', testConstants.customName)
    await tag.navigate()
      .editTag('@customTag', testConstants.newCustom, '@customEditedTag')
    await entry.navigate()
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Edit', testConstants.newCustom)
    await tag.navigate()
      .deleteTag('@customEditedTag')
    await entry.navigate()
    .pause(1000)
      .validateAuditEntry(testConstants.memberName, 'Tag', 'Delete', testConstants.newCustom)
  });
});
