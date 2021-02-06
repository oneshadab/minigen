import handlebars from 'handlebars';

const template = "user's name is {{ name }}";
const data = { name: 'john' };

const compiledTemplate = handlebars.compile(template);

const out = compiledTemplate(data);
console.log(out);
