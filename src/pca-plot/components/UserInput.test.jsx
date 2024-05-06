import { render, screen, fireEvent, within } from "@testing-library/react";
import UserInput from "./UserInput";

describe("User Input Component", () => {
  const mockParsedSampleInfo = [
    { name: "Sample1", attribute1: "Value1", attribute2: "Value2" },
  ];
  const mockSelectedCheckboxes = ["1", "2"];
  const mockSetShowChart = jest.fn();
  it("renders without crashing", () => {
    render(
      <UserInput
        parsedSampleInfo={mockParsedSampleInfo}
        selectedCheckboxes={mockSelectedCheckboxes}
        setShowChart={mockSetShowChart}
      />
    );
    const element = screen.getByTestId("user-input");
    expect(element).toBeInTheDocument();
  });

  it("renders input fields for CSV uploads", () => {
    render(
      <UserInput
        parsedSampleInfo={mockParsedSampleInfo}
        selectedCheckboxes={mockSelectedCheckboxes}
        setShowChart={mockSetShowChart}
      />
    );
    const input1 = screen.getByLabelText(/upload data/i);
    const input2 = screen.getByLabelText(/experimental design table/i);
    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
  });

  test("handles file uploads", () => {
    render(
      <UserInput
        parsedSampleInfo={mockParsedSampleInfo}
        selectedCheckboxes={mockSelectedCheckboxes}
        setShowChart={mockSetShowChart}
      />
    );

    const input1 = screen.getByLabelText(/upload data/i);
    const input2 = screen.getByLabelText(/experimental design table/i);

    const file1 = new File(["gene_count"], "data.csv", { type: "text/csv" });
    const file2 = new File(["sample_info"], "info.csv", { type: "text/csv" });

    // Simulate file upload for input1
    fireEvent.change(input1, { target: { files: [file1] } });

    // Assertions for input1
    expect(input1.files[0]).toBe(file1);
    expect(input1.files).toHaveLength(1);

    // Simulate file upload for input2
    fireEvent.change(input2, { target: { files: [file2] } });

    // Assertions for input2
    expect(input2.files[0]).toBe(file2);
    expect(input2.files).toHaveLength(1);
  });

  it("renders checkboxes for principal components", () => {
    render(
      <UserInput
        parsedSampleInfo={mockParsedSampleInfo}
        selectedCheckboxes={mockSelectedCheckboxes}
        setShowChart={mockSetShowChart}
      />
    );
    expect(screen.getByLabelText(/pc1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pc4/i)).toBeInTheDocument();
  });
  it("renders color by dropdown with correct options", () => {
    render(
      <UserInput
        parsedSampleInfo={mockParsedSampleInfo}
        selectedCheckboxes={mockSelectedCheckboxes}
        setShowChart={mockSetShowChart}
      />
    );
    const colorDropdown = screen.getByLabelText("Colour by:");
    expect(colorDropdown).toBeInTheDocument();
  
    const options = within(colorDropdown).getAllByRole("option");
    const expectedOptions = Object.keys(mockParsedSampleInfo[0])
      .filter(key => key !== "name")
      .slice(1);
  
    expect(options).toHaveLength(expectedOptions.length);
    expectedOptions.forEach((key, index) => {
      expect(options[index]).toHaveTextContent(key);
    });
  });
});
