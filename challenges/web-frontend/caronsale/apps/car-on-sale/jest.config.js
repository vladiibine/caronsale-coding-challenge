module.exports = {
  name: 'car-on-sale',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/car-on-sale',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
