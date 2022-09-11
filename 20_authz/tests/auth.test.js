const axios = require('axios')

const origin = 'http://localhost:3000'

const admin_username = 'admin'
const admin_password = '12345678'
const editor_username = 'editor'
const editor_password = '12345678'
const editor2_username = 'editor2'
const editor2_password = '12345678'
const comum_username = 'visitante'
const comum_password = '12345678'

const article_published_id = 'b2cebee5-57c1-4b8e-a551-651e34711234'
const article_draft_id = 'b2cebee5-57c1-4b8e-a551-651e3471303d'
const comment_vistante_id = 'b2cebee5-57c1-4b8e-a551-651e3471abdc'
const comment_editor_id = 'b2cebee5-57c1-4b8e-a551-651e3471303d'

const login = async (username, password) => {
  const response = await axios.post(
    `${origin}/login`,
    { username, password },
    { maxRedirects: 0, validateStatus: false }
  )
  return response
}

test('The server shoud be running on port 3000', async () => {
  const response = await axios.get(origin)
  expect(response.status).toBe(200)
});

test('Should be login admin', async () => {
  const response = await login(admin_username, admin_password)
  expect(response.status).toBe(302)
});

test('Should be login editor', async () => {
  const response = await login(editor_username, editor_password)
  expect(response.status).toBe(302)
});

test('Should be login visitante', async () => {
  const response = await login(comum_username, comum_password)
  expect(response.status).toBe(302)
});

//user not authenticate
test('Should not be add article from user not authenticate', async () => {
  const response = await axios.get(
    `${origin}/blogs/add`,
    { maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(401)
});

test('Should not be delete article published with user not authenticate', async () => {
  const response = await axios.get(
    `${origin}/blogs/delete/${article_published_id}`,
    { maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(401)
});

test('Should not be alter article published with user not authenticate', async () => {
  const response = await axios.post(
    `${origin}/blogs/edit/${article_published_id}`,
    {},
    { maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(401)
});

test('Should not be add comment with user not authenticate', async () => {
  const response = await axios.post(
    `${origin}/blogs/comments/add`,
    { 'teste': 'teste' },
    { maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(401)
});

test('Should not be delete comment with user not authenticate', async () => {
  const response = await axios.get(
    `${origin}/blogs/comments/delete/${comment_editor_id}`,
    { maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(401)
});

//vistante
test('Should not be add article with user visitante - role comum - GET', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/add`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});
test('Should not be add article with user visitante - role comum - POST', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.post(
    `${origin}/blogs/add`,
    {},
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not be delete article with user visitante - role comum', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/delete/${article_published_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not be alter article with user visitante - role Comum', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/edit/${article_published_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not view article draft with user visitante - role comum', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/${article_draft_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});


test('Should not delete comments that are not mine - role comum', async () => {
  const response_login = await login(comum_username, comum_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/comments/delete/${comment_editor_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

//editor

test('Should not view article draft to other user - role editor', async () => {
  const response_login = await login(editor2_username, editor2_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/${article_draft_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not edit article draft to other user - role editor', async () => {
  const response_login = await login(editor2_username, editor2_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.post(
    `${origin}/blogs/edit/${article_draft_id}`,
    {},
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not delete article draft to other user - role editor', async () => {
  const response_login = await login(editor2_username, editor2_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/delete/${article_draft_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});

test('Should not delete comments that are not mine - role editor', async () => {
  const response_login = await login(editor_username, editor_password)
  const cookies = response_login.headers['set-cookie']
  const response = await axios.get(
    `${origin}/blogs/comments/delete/${comment_vistante_id}`,
    { headers: { cookie: cookies[0] }, maxRedirects: 0, validateStatus: false }
  )
  expect(response.status).toBe(403)
});
