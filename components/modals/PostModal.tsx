"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { NewPost } from "@/interfaces/inputs";
import { IPostModalProps } from "@/interfaces/objects";
import { NewPostSchema, getYupSchema } from "@/yup/schemas";
import { useUserStore } from "@/store/userStore";
import { createPost, getImageUrl, getUserPosts, updatePost } from "@/services/post";

function PostModal({ postToEdit, changePostToEdit, setMyPosts }: IPostModalProps) {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<NewPost>(getYupSchema(NewPostSchema));

	const [isPublishing, setIsisPublishing] = useState(false);

	const { user: loggedUser } = useUserStore((user) => user);

	useEffect(() => {
		if (postToEdit != null) {
			setValue("post", postToEdit.post.content);
		}
	}, [postToEdit]);

	const handlePublish = handleSubmit(async (data) => {
		// loading started
		setIsisPublishing(true);

		if (postToEdit !== null && changePostToEdit != null) {
			// Update a post
			let imageUrlUpdated;
			if (data.image.length === 0) {
				imageUrlUpdated = postToEdit.post.image;
			} else {
				imageUrlUpdated = await getImageUrl(data.image);
			}
			await updatePost(postToEdit.post.id, data.post, imageUrlUpdated);
			changePostToEdit(null);

			// Update all my post with the changes
			if (loggedUser !== null && setMyPosts != null) {
				const data = await getUserPosts(loggedUser.id);
				setMyPosts(data);
			}

			// Close actions dropdown
			closePostActionsDropdown();
		} else if (loggedUser !== null) {
			// Create a post
			await createPost(data.post, data.image, loggedUser.id);
		}

		// Clear fields
		reset();

		// Loading finished
		setIsisPublishing(false);

		// Close modal
		document.getElementById("postModal")?.close();
	});

	const closePostActionsDropdown = () => {
		if (postToEdit !== null) {
			document.getElementById(`actionsPost${postToEdit.post.id}`)?.removeAttribute("open");
		}
	};

	return (
		<dialog id="postModal" className="modal modal-bottom sm:modal-middle">
			<div className="modal-box">
				<h3 className="font-bold text-lg text-center mb-4">Nueva experiencia</h3>
				<form onSubmit={handlePublish}>
					<div className="form-control w-full mb-4">
						<textarea
							autoComplete="off"
							className="textarea textarea-primary w-full"
							placeholder="Cuentanos tu experiencia"
							{...register("post")}
						></textarea>
						{errors.post && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.post.message}</span>
							</label>
						)}
					</div>
					{postToEdit != null && (
						<div className="mb-4">
							<Image
								alt="Image of editing post"
								src={postToEdit.post.image as string}
								width={768}
								height={768}
								priority={true}
							/>
							<label>Selecciona una nueva imagen para reemplazar el actual</label>
						</div>
					)}
					<div className="form-control w-full mb-4">
						<input
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
							className="file-input file-input-bordered file-input-primary w-full"
							{...register("image")}
						/>
						{errors.image && (
							<label className="label">
								<span className="label-text-alt text-error">{errors.image.message}</span>
							</label>
						)}
					</div>
					<div className="flex justify-end gap-4">
						<button
							className="btn"
							type="button"
							onClick={() => {
								document.getElementById("postModal")?.close();
								if (changePostToEdit !== null) {
									changePostToEdit(null);
								}
								reset();
								closePostActionsDropdown();
							}}
						>
							Cerrar
						</button>
						<button className="btn btn-primary" type="submit">
							{isPublishing && <span className="loading loading-infinity loading-md"></span>}
							{isPublishing ? "Publicando" : "Publicar"}
						</button>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button
					onClick={() => {
						if (changePostToEdit !== null) {
							changePostToEdit(null);
						}
						reset();
						closePostActionsDropdown();
					}}
				>
					close
				</button>
			</form>
		</dialog>
	);
}

export default PostModal;
