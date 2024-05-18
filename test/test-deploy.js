// Mocha là một framework kiểm thử cho JavaScript, thường được sử dụng để kiểm thử các ứng dụng Node.js và trình duyệt web. 
// Trong Hardhat, Mocha được tích hợp để hỗ trợ việc viết bài kiểm thử(test) để đảm bảo tính đúng đắn cho các hợp đồng thông minh Ethereum.
// Trong Hardhat, Mocha thường được sử dụng một cách tự động và không yêu cầu việc import trực tiếp trong mã nguồn của bạn. Khi bạn sử dụng Hardhat để chạy bài kiểm thử, nó sẽ tự động tích hợp Mocha và chạy các bài kiểm thử của bạn.

const { ethers } = require("hardhat");
// nếu dùng TypeScript: import { ethers } from "hardhat";
const { assert, expect } = require("chai");
// nếu dùng TypeScript: import { assert, expect } from "chai";
// import { SimpleStorage, SimpleStorage__factory } from "../typechain-types" // nếu dùng TypeScript để thiết lập type contract của SimpleStorage cho contract SimpleStorage (xem thêm ở file hardhat.config.js về typechain)

// Trong Hardhat với Mocha (một thư viện kiểm thử JavaScript), từ khóa "describe" được sử dụng để tạo ra một khối (block) kiểm thử (test suite). 
// Mục đích chính của "describe" là nhóm các bài kiểm thử liên quan lại với nhau để tạo ra một bộ kiểm thử có tổ chức.

// describe("Mô tả của bài kiểm thử hoặc khối kiểm thử", function() { // ("function() {}" làm một hàm ẩn danh)
//   // Các bài kiểm thử hoặc các khối describe con sẽ ở đây
// }); 
// describe("Mô tả của bài kiểm thử hoặc khối kiểm thử", () => { // ("() => {}" làm một hàm mũi tên)
//   // Các bài kiểm thử hoặc các khối describe con sẽ ở đây
// }); 
// // (2 đoạn code trên về cơ bản là tương tự nhau. (Nhưng không hoàn toàn giống nhau))

// "beforeEach": được sử dụng để thiết lập trạng thái hoặc thực hiện các hành động trước khi chạy mỗi bài kiểm thử (test case) trong khối "describe".
  // beforeEach(async function() {
  //   // Các hành động chuẩn bị trước mỗi bài kiểm thử
  // });

// it: được sử dụng để định nghĩa một bài kiểm thử cụ thể (test case) trong khối "describe".
  // it("Mô tả bài kiểm thử", async function() {
  //   // Nội dung của bài kiểm thử
  // });
  
// assert: là một phần của Node.js và được sử dụng để kiểm tra điều kiện và nếu điều kiện không đúng, nó sẽ ném một lỗi.  
  // vd: kiểm tra số dư sau khi chuyển tiền 100 đơn vị:
    // assert.strictEqual(balanceAfter, balanceBefore - 100, "Số dư sau khi chuyển tiền không đúng");
// expect: thường được sử dụng với các thư viện kiểm thử như Mocha để tạo ra các câu lệnh kiểm thử dễ đọc và phong cách hơn. Nó cung cấp các phương thức (ví dụ: .to.equal(), .to.be.true()) để so sánh giá trị và kiểm tra điều kiện.
  // vd: kiểm tra số dư sau khi chuyển tiền 100 đơn vị:
    // expect(balanceAfter).to.equal(balanceBefore - 100, "Số dư sau khi chuyển tiền không đúng");
// assert và expect đều được import từ module chai
// Lưu ý rằng sự lựa chọn giữa assert và expect thường phụ thuộc vào sự ưa thích cá nhân và cộng đồng dự án.

describe("SimpleStorage", function() {
  let simpleStorageFactory, simpleStorage;
  // let simpleStorageFactory : SimpleStorage__factory // nếu dùng TypeScript
  // let simpleStorage : SimpleStorage // nếu dùng TypeScript

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    // simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory; // nếu dùng TypeScript
    simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
      // (assert.equal(...): Asserts non-strict equality (==) of actual and expected.)
    // hoặc:
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it("Should update when call store", async function () {
    const expectedValue = "9";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
    // hoặc:
    // expect(currentValue.toString()).to.equal(expectedValue);
  })
}); 

// Để chạy test: yarn hardhat test
// yarn hardhat test --grep <keywork>: Only run tests matching the given string or regexp
  // hoặc cách khác là có thể đặt từ khóa "only" vào test đó, ví dụ như: it.only("Should update when call store", async function () {...
