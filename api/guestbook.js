// src/api/guestbook.js

// 🔴 重要：这里一定要填你刚刚在 Google Sheets 部署拿到的那个 Web App URL
// 格式通常是 https://script.google.com/macros/s/......./exec
const GOOGLE_SCRIPT_URL = "请把你的_Google_Web_App_URL_粘贴在这里";

/**
 * 发送便便日记到 Google Sheets
 * @param {Object} data - 包含 { poop_shape, mood, memo } 的对象
 * @returns {Promise} - 返回请求结果
 */
export const submitGuestbookEntry = async (data) => {
  // 1. 简单的本地校验
  if (!data.poop_shape || !data.mood) {
    throw new Error("请确保选择了造型和心情！");
  }

  // 2. 准备发送的数据包
  // 注意：我们不发送 date，因为 Google 后端会自动生成北京时间
  const payload = {
    poop_shape: data.poop_shape,
    mood: data.mood,
    memo: data.memo || "" // 如果没有留言，给一个空字符串
  };

  try {
    // 3. 发起请求
    // 使用 fetch 发送 POST 请求
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // Google Apps Script 特殊要求：用 text/plain 避免复杂的跨域预检(OPTIONS)请求
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // Google 返回的是重定向或者是 JSON，我们需要解析它
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("提交 Google Sheets 失败:", error);
    throw error; // 把错误抛出去，让组件知道出错了
  }
};