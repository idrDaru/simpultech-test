class MessagesController < ApplicationController
  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.create(message_params)
    redirect_to room_path(@room)
  end

  private
    def message_params
      params.require(:message).permit(:message)
    end
end
