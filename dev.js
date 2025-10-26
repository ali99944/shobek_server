import conn from "./config/db.js";
import orderModel from "./models/orderModel.js";
import productModel from "./models/productModel.js";
import userModel from "./models/userModel.js";
import categoryModel from "./models/categoryModel.js";


async function main() {
  conn();

  const orders = await orderModel
    .find({})
    .populate({
      path: 'products',
      select: '-photo', // 👈 Exclude the photo field
      populate: {
        path: 'category',
        model: 'category'
      }
    })
    .populate({
      path: 'quantities.productId',
      select: '-photo', // 👈 Exclude photo here too if needed
      populate: {
        path: 'category',
        model: 'category'
      }
    })
    .populate('customer')
    .sort({ createdAt: -1 });

  console.log(orders.at(0));
}

main();
