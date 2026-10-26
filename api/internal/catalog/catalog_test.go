package catalog

import "testing"

func TestLoadAndDraft(t *testing.T) {
	c := Load()
	if len(c.Services) == 0 || len(c.Packages) == 0 {
		t.Fatal("empty catalog")
	}
	lines := c.Draft("", []Pick{
		{Service: "website", Option: "business"},
		{Service: "app", Option: "simple", Platform: "both"},
		{Service: "ads", Option: "meta"},
		{Service: "nope"},
	})
	if len(lines) != 4 {
		t.Fatalf("want 4 lines (website, app, ads setup, ads monthly), got %d: %+v", len(lines), lines)
	}
	if lines[1].Amount != 49000 { // 35,000 × 1.4
		t.Errorf("app for both platforms = %d, want 49000", lines[1].Amount)
	}
	once, monthly := Totals(lines, 4000)
	if once != 25000+49000+5000-4000 || monthly != 8000 {
		t.Errorf("totals = %d, %d", once, monthly)
	}
	if got := c.Draft("complete", nil); len(got) != 2 || got[0].Amount != 85000 {
		t.Errorf("package draft = %+v", got)
	}
}
