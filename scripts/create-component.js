const fs = require('fs');
const path = process.argv[2];
if (!path) {
  console.error('ComponentName is undefined');
  return;
}
const componentName = path.replace(/^.*\//,'');
const componentFolder = './src/components/' + path;

const files = {
  'index.ts': `export { ${componentName} } from './${componentName}';`,
  [`${componentName}.tsx`]: `import React from 'react';
import classNames from 'classnames/bind';
import styles from './${componentName}.css';

const cx = classNames.bind(styles);

interface I${componentName}Props {

}

const ${componentName}: React.FC<I${componentName}Props> = (props) => {

  return (
    <div className={cx('wrapper')}>hello ${componentName}</div>
  );
}

export {${componentName}};
`,
  [`${componentName}.css`]: `

.wrapper {
  background: #fcc;
}

`,
};

fs.mkdir(componentFolder, () => {
  console.log('created directory ', componentFolder);
  for (const fileName in files) {
    const content = files[fileName];
    const path = componentFolder + '/' + fileName;
    fs.writeFile( path, content, (err) => {
      if (!err) {
        console.log(path, ' created')
      } else {
        console.log(path, ' failed')
      }
    } )
  }
});
