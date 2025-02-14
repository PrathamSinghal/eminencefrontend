import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class VideoUploadAdapter extends Plugin {
    init() {
        const editor = this.editor;

        // Add the 'insertVideo' command
        editor.ui.componentFactory.add('insertVideo', (locale:any) => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Insert Video',
                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSepfiClkGEFH9Oewvp3rCQEbewAzJm77M5Q&s",
                tooltip: true
            });

            // Execute the callback when the button is clicked
            view.on('execute', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'video/*';
                input.onchange = function (event:any) {
                    const file = event.target.files[0];
                    const reader = new FileReader();

                    reader.onload = function (e:any) {
                        const videoElement = `
                            <figure class="media">
                                <video controls width="600">
                                    <source src="${e.target.result}" type="${file.type}">
                                    Your browser does not support the video tag.
                                </video>
                            </figure>
                        `;
                        editor.model.change((writer:any) => {
                            editor.model.insertContent(writer.createText(videoElement));
                        });
                    };

                    reader.readAsDataURL(file);
                };

                input.click();
            });

            return view;
        });
    }
}
