const visit = require('unist-util-visit');

module.exports = ({markdownAST, compiler}, pluginOptions) => {
  visit(markdownAST, 'table', (node) => {
    let tableHtml = compiler.generateHTML(node);
    const html = `
      <div style="overflow-x:auto;">
        ${tableHtml}
      </div>
    `;

    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });

  return markdownAST;
};
