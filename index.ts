import handlebars from 'handlebars';
import marked from 'marked';

const page = 'hello!';
const data = { content: marked(page) };

const template = "Content is {{{ content }}}";

const compiledTemplate = handlebars.compile(template);

const out = compiledTemplate(data);
console.log(page);
console.log(out);
