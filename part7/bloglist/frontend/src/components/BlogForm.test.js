import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  test("event handler is callect correctly when a new blog is created", async () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog} />)
    const user = userEvent.setup()
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")
    const button = screen.getByText("Save")
    await user.type(title, "Title")
    await user.type(author, "Author")
    await user.type(url, "URL")
    await user.click(button)
    expect(createBlog.mock.calls[0][0].title).toBe("Title")
    expect(createBlog.mock.calls[0][0].author).toBe("Author")
    expect(createBlog.mock.calls[0][0].url).toBe("URL")
    expect(createBlog.mock.calls).toHaveLength(1)
  })
})
