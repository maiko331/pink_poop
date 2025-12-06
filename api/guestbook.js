// src/api/guestbook.js

// ✅ 这是你刚才提供的真实 Google Apps Script 链接
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzacAiR6Mx0f2SooDBOOl4Omorz4_t2scgPA_97mIpyg11X_G7whuyvtXFwuVNI0sUq/exec";

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
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      // 关键设置：使用 text/plain 避免 CORS 预检请求报错
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // 4. 解析结果
    // Google Apps Script 通常会返回 JSON
    const result = await response.json();
    return result;

  } catch (error) {
    console.error("提交 Google Sheets 失败:", error);
    throw error; // 把错误抛出去，让组件知道出错了
  }
};