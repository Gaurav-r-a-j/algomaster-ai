import { formatDate } from "@/utils/format-date"

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15")
    const result = formatDate(date)
    expect(result).toBe("January 15, 2024")
  })
})
