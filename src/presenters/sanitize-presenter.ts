
import DOMPurify from "dompurify";

class SanitizePresenter {

	public sanitize(html: string): string {
		return DOMPurify.sanitize(html);
	}
}

export default new SanitizePresenter();