const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');
const courses = [
  { id : 1 , name : 'course 01' },
  { id : 2 , name : 'course 02' },
  { id : 3 , name : 'course 03' }
];
app.use(express.json());

app.get('/', (req,res) => res.send('Hello World'));
app.get('/api/courses', (req,res) => res.send(courses));

app.get('/api/courses/:id', (req,res) => {
  const course = courses.find( x => x.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course not foud');
  res.send(course);
});


app.put('/api/courses/:id', (req,res) => {
  const course = courses.find( x => x.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course not found');


  const schema = Joi.object({
    name : Joi.string().min(3).required()
  })
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);


  course.name = req.body.name;
  res.send(course);

});


app.delete('/api/courses/:id', (req,res) => {
  const course = courses.find( x => x.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);

});

app.post('/api/courses/', (req,res) => {
  const schema = Joi.object({
    name : Joi.string().min(3).required()
  })
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id : courses.length +1,
    name : req.body.name
  };
  courses.push(course);
  res.send(course);
});


app.listen(port,console.log(`App listened to port ${port}...`));
