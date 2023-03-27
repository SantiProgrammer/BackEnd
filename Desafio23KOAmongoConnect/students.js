const Router = require("koa-router");
const Student = require('./schemas/studentSchema');

const router = new Router({ prefix: "/students" });

let students = [];

/* API REST Get All */
router.get("/", async (ctx) => {
  try {
    const data = await Student.find({});
    ctx.response.status = 302;
    return (ctx.body = {
      status: "✅ Success!",
      students: data,
    });
  } catch (error) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: `"❌ Error!: ${error}"`,
    });
  }
});

/* API REST Get x ID */
router.get("/:dni", async (ctx) => {
  const dni = ctx.params.dni
  try {
    const foundStudent = await Student.findOne({ dni: dni });
    if (foundStudent) {
      return (ctx.body = foundStudent);
    }
  } catch (error) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: `"❌ Error!: ${error}"`,
    });
  }
});

/* API REST Post */
router.post("/", async (ctx) => {
  if (ctx.request.body) {
    try {
      await Student.create(ctx.request.body)
      ctx.response.status = 201;
      return (ctx.body = {
        status: "✅ Success:",
        message: `Student created with dni: ${ctx.request.body.dni} & name: ${ctx.request.body.name}`,
      });

    } catch (error) {
      ctx.response.status = 400;
      return (ctx.body = {
        status: "❌ Error!" `${error}`,
        message: "Please enter the data",
      });
    }
  }
});

/* API REST Put */
router.put("/:dni", async (ctx) => {
  try {
    const dni = ctx.params.dni
    await Student.replaceOne({ dni: dni }, ctx.request.body);
    ctx.response.status = 302;
    return (ctx.body = {
      status: "✅ Success:",
      message: `Updated with dni: ${ctx.request.body.dni} & name: ${ctx.request.body.name}`,
    });
  } catch (error) {
    ctx.response.status = 304;
    return (ctx.body = {
      status: "❌ Error!" `${error}`,
      message: "Please enter the data",
    });

  }
});

/* API REST Delete */
router.delete("/:dni", async (ctx) => {
  try {
    const dni = ctx.params.dni;
    await Student.deleteOne({ dni: dni })
    ctx.response.status = 200;
    return (ctx.body = {
      status: "✅ Success",
      message: `Student with dni: ${dni} was deleted!`,
    });
  } catch (error) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "❌ Error",
      message: "Cant delete",
    });
  }
});

/* API REST Get x ID */
router.get('/subject/:subject', async (ctx) => {
  try {
    const materia = ctx.params.subject
    const foundStudents = await Student.find({ subject: materia });
    ctx.response.status = 200;
    return (ctx.body = {
      status: "✅ Success",
      message: `Student with subject: ${materia}, was found!`,
      student: foundStudents
    });
  } catch (errer) {
    ctx.response.status = 404;
    ctx.body = {
      status: '❌ Error!',
      message: `${error}`
    };
  }
});

module.exports = { students: router };
