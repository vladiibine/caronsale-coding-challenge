module.exports = {
  name: 'buyer',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/buyer',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
