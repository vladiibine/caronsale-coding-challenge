module.exports = {
  name: 'dealership',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dealership',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
