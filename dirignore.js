const fs = require('fs');
const program = require('commander');

program
    .option('-p, --path <s>')
    .option('-d, --depth <n> [1]')
    .parse(process.argv);


const deptharg = parseInt(program.depth || 1);

var dirCb = (root,sub,depth, err, items) => {
    if(!items) return;

    items.forEach(dir => {
        if(depth === deptharg)
            console.log((sub + '/' +dir+'/')
                .replace(new RegExp("^\\\\"), "")
                .replace(new RegExp("\\\\"), "/"));
        else
        {
            var s = sub + '\\' + dir;
            fs.readdir(root+s, dirCb.bind(null,root,s,depth+1));
        }
    });
};
fs.readdir(program.path, dirCb.bind(null,program.path,'',1));