"use strict";

var visit = require('unist-util-visit');

module.exports = function (_ref, pluginOptions) {
  var markdownAST = _ref.markdownAST,
      compiler = _ref.compiler;
  visit(markdownAST, 'table', function (node) {
    var tableHtml = compiler.generateHTML(node);
    var html = "\n      <div style=\"overflow-x:auto;\">\n        " + tableHtml + "\n      </div>\n    ";
    node.type = 'html';
    node.children = undefined;
    node.value = html;
  });
  return markdownAST;
};