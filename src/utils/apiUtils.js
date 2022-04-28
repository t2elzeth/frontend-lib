export async function httpGet(url, params = {}) {
  url += "?" + new URLSearchParams(params).toString();

  return await processHttpResponse(() => fetch(url, {
    method: "get",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    credentials: "same-origin",
  }));
}

export async function httpPost(url, body) {
  return await processHttpResponse(() => fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    credentials: "same-origin",
  }));
}

export async function httpPostForm(url, formData) {
  return await processHttpResponse(() => fetch(url, {
    method: "post",
    body: formData,
    credentials: "same-origin"
  }));
}

function success(payload) {
  return response(null, payload);
}

function failure(error) {
  return response(error, null);
}

function response(error, success) {
  const r = [error, success];

  r.error = r[0];
  r.result = r[1];

  r.apply = (errorSetter, resultSetter) => {
    errorSetter(r.error);
    resultSetter(r.result);
  };

  return r;
}

function systemError() {
  return failure({
    message: "Ошибка системы"
  });
}

async function processHttpResponse(requestFunc) {
  try {
    const result = await requestFunc();

    if (result.ok) {
      const contentType = result.headers.get("content-type");
      const isJson = contentType != null && contentType.indexOf("application/json") !== -1;

      if (isJson) {
        const resultJson = await result.json();
        return success(resultJson);
      }

      const isHtml = contentType != null && contentType.indexOf("text/html") !== -1;

      if (isHtml) {
        const html = await result.text();
        return success(html);
      }

      return success({});
    }

    if (result.status === 400) {
      const errorJson = await result.json();

      console.warn("errorJson", errorJson);

      return failure(errorJson);
    }

    console.error("error result", result);

    return systemError();
  } catch (e) {
    console.error("caught error", e);
    return systemError();
  }
}