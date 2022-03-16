const json = JSON.stringify;
const path = require('path');
const fs = require('fs');

function getPreloadFileMatrix () {
  return fs.readdirSync(path.resolve(__dirname, '../src/scripts'))
    .filter(file => file.includes('entry') && !file.includes('ui-kit') && !file.includes('theme'))
    .map(file => [file.replace('.ts', '.js'), file.replace(/\.[tj]s/, '.css')]);
}

const textColorOptions = [
  { value: 'text-gray-100', label: 'Gray 100' },
  { value: 'text-gray-200', label: 'Gray 200' },
  { value: 'text-gray-300', label: 'Gray 300' },
  { value: 'text-gray-400', label: 'Gray 400' },
  { value: 'text-gray-500', label: 'Gray 500' },
  { value: 'text-gray-600', label: 'Gray 600' },
  { value: 'text-gray-700', label: 'Gray 700' },
  { value: 'text-red-200', label: 'Red 200' },
  { value: 'text-red-400', label: 'Red 400' },
  { value: 'text-red-500', label: 'Red 500' },
  { value: 'text-red-700', label: 'Red 700' },
  { value: 'text-blue-200', label: 'Blue 200' },
  { value: 'text-blue-500', label: 'Blue 500' },
  { value: 'text-blue-700', label: 'Blue 700' },
  { value: 'text-green-200', label: 'Green 200' },
  { value: 'text-green-500', label: 'Green 500' },
  { value: 'text-green-700', label: 'Green 700' },
  { value: 'text-yellow-200', label: 'Yellow 200' },
  { value: 'text-yellow-500', label: 'Yellow 500' },
  { value: 'text-yellow-700', label: 'Yellow 700' },
  { value: 'text-black', label: 'Black' },
  { value: 'text-white', label: 'White' },
  { value: 'text-transparent', label: 'Transparent' },
  { value: 'text-current', label: 'Current' },
];

module.exports = {
  textColorOptions: json(textColorOptions),
  preloadFileMatrix: getPreloadFileMatrix(),
};
