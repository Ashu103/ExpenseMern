import { category, transaction } from "../models/model.js";

//post  categories
export const create_Categories = async (req, res) => {
  const create = new category({
    type: "Investment",
    color: "#FCBE44",
  });

  await create.save((err) => {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
};
//GET
export const get_Categories = async (req, res) => {
  let data = await category.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color, type_id: v._id })
  );

  return res.json(filter);
};

export const create_Transaction = async (req, res) => {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

  let { name, type_id, amount } = req.body;

  const create = await new transaction({
    name,
    type_id,
    amount,
    date: new Date(),
  });
  create.save((err) => {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Erro while creating transaction ${err}` });
  });
};

export const get_Transaction = async (req, res) => {
  let data = await transaction.find({});
  return res.json(data);
};

export const del_Transaction = async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Request body not found" });

  await transaction
    .deleteOne(req.body, (err) => {
      if (!err) res.json("Record Deleted... !");
    })
    .clone()
    .catch((err) => {
      res.json("Error while deleting Transaction Record");
    });
};

export const get_Labels = async (req, res) => {
  try {
    const result = await transaction.aggregate([
      {
        $lookup: {
          from: "category",
          localField: "type_id",
          foreignField: "type_id",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(400).json("Looup Collection Error");
  }
};
